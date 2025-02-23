import axios from 'axios';
import RSSParser from 'rss-parser';
import { logInfo, logError } from '@/app/utils/logger';
import { extractImageFromArticle } from '@/app/utils/extractImageFromArticle';
import { PrismaClient } from '@prisma/client';
import { categorizeArticle } from '@/app/utils/categorizeArticle';


// This interface defines the structure for our article objects, ensuring they include all required fields (like our custom "media:content") for categorization and image extraction.
// It enforces type safety and improves code clarity in this file.
interface CategorizedArticle {
    title: string;
    link: string;
    date: Date;
    summary: any;
    author: any;
    region: string;
    item: MyRSSItem;
  }

  interface MyRSSItem extends RSSParser.Item {
    "media:content"?: { url: string };
  }

const prisma = new PrismaClient();
const parser = new RSSParser();

// Default and backup image paths
const DEFAULT_IMAGE_PATH = "/images/default.webp";
const BACKUP_IMAGE_FOLDER = "/images/rss_backup/";

// Retry configuration for categorization failures
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000; // 2 seconds

/**
 * Sleep function to introduce delays.
 * @param ms - Milliseconds to sleep.
 */
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches active RSS feeds from the database.
 */
async function getRSSFeedsFromDB() {
  try {
    const feeds = await prisma.rSSFeed.findMany({
      where: { active: true },
    });
    return feeds.map(feed => ({
      id: feed.id,
      name: feed.name,
      url: feed.url,
      region: feed.region || "Unknown",
      failureCount: feed.failureCount || 0,
    }));
  } catch (error) {
    logError(`❌ Error fetching RSS feeds from database: ${(error as Error).message}`);
    return [];
  }
}

// used to truncate any strings in the logs (optional)
function truncate(str: string, maxLength: number): string {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

/**
 * Main function to fetch and process RSS feeds.
 */
export async function fetchAndCategorizeRSS() {
  const startTime = new Date();
  logInfo(`📅 Process started at: ${startTime.toLocaleString()}`);

  const rssFeeds = await getRSSFeedsFromDB();

  if (rssFeeds.length === 0) {
    logError("⚠️ No active RSS feeds found in the database.");
    return;
  }

  logInfo(`🚀 Running Categorization and RSS Fetch Script - Processing ${rssFeeds.length} feeds`);

  const now = new Date();
  const processedLinks = new Set<string>();
  let totalArticlesFetched = 0;
  let totalArticlesFiltered = 0;
  let totalArticlesInDB = 0;
  let totalArticlesCategorized = 0;
  let totalArticlesSkippedDueToCategorization = 0;
  let totalArticlesSavedToDB = 0;
  const categoryCounts: { [key: string]: number } = {};
  const failedFeeds: { id: string; name: string; error: string }[] = [];
  let totalArticlesSkippedDueToMissingImage = 0;
  let totalArticlesSkippedDueToDuplicates = 0;

  await Promise.all(rssFeeds.map(async (feed) => {
    let feedArticlesFetched = 0;
    let feedArticlesFiltered = 0;
    let feedArticlesInDB = 0;
    let feedArticlesSaved = 0;

    // Declare articlesToSave array for this feed
    const articlesToSave: any[] = [];

    try {
      const response = await axios.get(feed.url, { timeout: 5000, headers: { 'User-Agent': 'Mozilla/5.0' } });
      const parsedFeed = await parser.parseString(response.data);

      if (!parsedFeed.items || parsedFeed.items.length === 0) {
        logError(`⚠️ No articles found in feed: ${feed.name}`);
        throw new Error("No articles found.");
      }

      const articles = parsedFeed.items;
      totalArticlesFetched += articles.length;
      feedArticlesFetched += articles.length;

      // Step 1: Filter articles within the last 24 hours and not in DB
      const articlesToCategorize: CategorizedArticle[] = [];

      for (const item of articles) {
        const articleTitle = item.title || "Untitled";
        const articleLink = item.link || "";
        const articleDate = item.pubDate ? new Date(item.pubDate) : new Date();
        const articleSummary = item.contentSnippet || item.description || "No summary available.";
        const articleAuthor = item.creator || item.author || "Unknown";
        const articleRegion = feed.region || "Unknown";

        // Check if the article is within the last 24 hours
        const timeDiff = now.getTime() - articleDate.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        if (hoursDiff > 24) {
            logInfo(`\n=======================================================================================`);
            logInfo(`🛑 RSS Feed Summary for:  ${feed.name.padEnd(25)}`);
            logInfo(` Confirming fetch for last 24 hrs only..`);
          break; // Stop processing older articles
        }
        totalArticlesFiltered++;
        feedArticlesFiltered++;

        // Check if the article already exists in the database
        const existingArticle = await prisma.savedArticle.findUnique({
          where: { link: articleLink }
        });

        if (existingArticle) {
          totalArticlesInDB++;
          feedArticlesInDB++;
          continue;
        }

        if (processedLinks.has(articleLink)) {
            totalArticlesSkippedDueToDuplicates++;
            continue;
          }
          processedLinks.add(articleLink);

        // Add article to list for categorization, including the original item for image extraction
        articlesToCategorize.push({
          title: articleTitle,
          link: articleLink,
          date: articleDate,
          summary: articleSummary,
          author: articleAuthor,
          region: articleRegion,
          item: item
        });
      }

      // Step 2: Concurrently categorize articles
      await Promise.all(articlesToCategorize.map(async (article) => {
        let articleCategory = "Uncategorized";
        let categorizationSuccess = false;

        // Retry mechanism for categorization
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            articleCategory = await categorizeArticle(article.title, article.summary);
            categorizationSuccess = true;
            break; // Exit loop on success
          } catch (error) {
            logError(`❌ Categorization failed for article "${truncate(article.title, 30)}" from "${feed.name}": ${(error as Error).message}`);
            if (attempt < MAX_RETRIES) {
              logInfo(`🔄 Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
              await sleep(RETRY_DELAY_MS);
            }
          }
        }

        if (!categorizationSuccess) {
          totalArticlesSkippedDueToCategorization++;
          return;
        }

        totalArticlesCategorized++;
        logInfo(`🔄 Categorizing Article: ${article.title}`);
        logInfo(`✅ Assigned Category: ${articleCategory}`);

        // Extract image using the original item data
        let articleImage = article.item.enclosure?.url || article.item["media:content"]?.url || null;
        let imageSource = "RSS Feed";

        if (!articleImage) {
          articleImage = await extractImageFromArticle(article.link);
          imageSource = articleImage ? "Article Extraction" : "None";
        }

        if (!articleImage) {
            articleImage = BACKUP_IMAGE_FOLDER;
            imageSource = "RSS_backup_folder";
        }

        if (!articleImage) {
          articleImage = DEFAULT_IMAGE_PATH;
          imageSource = "Default Image";
        }

        if (!articleImage || imageSource === "None") {
          logInfo(`⚠️ Skipping article: "${truncate(article.title, 30)}" - No valid image found.`);
          totalArticlesSkippedDueToMissingImage++;
          return;
        }

        logInfo(`✅ Image successfully retrieved from: ${imageSource}`);

        // Add the fully prepared article to the batch save array.
        articlesToSave.push({
          title: article.title,
          date: article.date,
          link: article.link,
          summary: article.summary,
          imageURL: articleImage,
          author: article.author,
          source: feed.name,
          region: feed.region,
          category: articleCategory
        });
        logInfo(`✅ Article from  ${feed.name} added to batch save.`);

        // Update category count for final summary
        categoryCounts[articleCategory] = (categoryCounts[articleCategory] || 0) + 1;
      }));
          
      // Batch insert of articles to the database with duplicate handling
      if (articlesToSave.length > 0) {
        for (const article of articlesToSave) {
            try {
              await prisma.savedArticle.create({ data: article });
              totalArticlesSavedToDB++;
              feedArticlesSaved++;
            } catch (error) {
              const dbError = error as any;
              if (dbError.code === 'P2002') {
                totalArticlesSkippedDueToDuplicates++;
                console.warn(`⚠️ Duplicate article detected and skipped: ${truncate(article.title, 30)}`);
              } else {
                console.error(`❌ Error saving article "${article.title}":`, dbError);
              }
            }
          }
      }

      // ✅ Summary for the processing of individual RSS feeds
      logInfo(`🌐 Fetching RSS feed:     ${feed.url}`);
      logInfo(`✅ Articles Fetched:      ${String(feedArticlesFetched).padStart(5)}`);
      logInfo(`📅 Filtered Last 24h:     ${String(feedArticlesFiltered).padStart(5)}`);
      logInfo(`⚠️  Skipped (In DB):       ${String(feedArticlesInDB).padStart(5)}`);
      logInfo(`✅ Saved to Database:     ${String(feedArticlesSaved).padStart(5)}`);
      logInfo("\n");

    } catch (feedError) {
      failedFeeds.push({ id: feed.id, name: feed.name, error: (feedError as Error).message });
    }
  }));

  const endTime = new Date();
  const totalArticlesInDatabase = await prisma.savedArticle.count();

  logInfo(`\n============================== 📊 FINAL SUMMARY 📊 ==============================`);
  logInfo(`📑 Total Articles Fetched:                   ${String(totalArticlesFetched).padStart(5)}`);
  logInfo(`📅 Total Articles Filtered (24h):            ${String(totalArticlesFiltered).padStart(5)}`);
  logInfo(`🗄️  Total Articles Already in Database:       ${String(totalArticlesInDB).padStart(5)}`);
  logInfo(`✅ Total Articles Successfully Categorized:  ${String(totalArticlesCategorized).padStart(5)}`);
  logInfo(`🚫 Total Articles Categorization Failure:    ${String(totalArticlesSkippedDueToCategorization).padStart(5)}`);
  logInfo(`❌ Articles Skipped Due to Missing Image:    ${String(totalArticlesSkippedDueToMissingImage).padStart(5)}`);
logInfo(`❌ Articles Skipped Due to Duplicates:       ${String(totalArticlesSkippedDueToDuplicates).padStart(5)}`);
  logInfo(`✅ Total Articles Saved to Database:         ${String(totalArticlesSavedToDB).padStart(5)}`);
  logInfo(`🗂️  Total Articles in Database (updated):     ${String(totalArticlesInDatabase).padStart(5)}`);

  logInfo(`\n🔍 Categorization Breakdown:`);
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const percentage = totalArticlesCategorized > 0 ? ((count / totalArticlesCategorized) * 100).toFixed(2) : "0.00";
    logInfo(`   - ${category.padEnd(30)} ${count} articles (${percentage}%)`);
  });

  logInfo(`🚀 Total RSS Feeds Processed: ${rssFeeds.length}`);
  if (failedFeeds.length > 0) {
    logInfo(`❌ Total RSS Feeds Failed: ${failedFeeds.length}`);
    failedFeeds.forEach(feed => logInfo(`   - ${feed.name} | Error: ${feed.error}`));
  } else {
    logInfo(`❌ Total RSS Feeds Failed:      0`);
  }

  logInfo(`Process ended at: ${endTime.toLocaleString()}`);

  const durationMs = endTime.getTime() - startTime.getTime();
  const durationSeconds = Math.floor((durationMs / 1000) % 60);
  const durationMinutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const durationHours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);

  logInfo(`Total duration: ${durationHours}h ${durationMinutes}m ${durationSeconds}s`);
}

(async () => {
  try {
    await fetchAndCategorizeRSS();
  } catch (error) {
    logError(`🚨 Fatal Error in RSS Fetching Process: ${(error as Error).message}`);
  }
})();