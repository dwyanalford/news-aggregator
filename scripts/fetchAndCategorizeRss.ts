import axios from 'axios';
import RSSParser from 'rss-parser';
import { logInfo, logError } from '@/app/utils/logger';
import { extractImageFromArticle } from '@/app/utils/extractImageFromArticle';
import { PrismaClient } from '@prisma/client';
import { categorizeArticle } from '@/app/utils/categorizeArticle';
import pLimit from 'p-limit'; // to control the number of concurrent categorization requests

// Interfaces for type safety
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

const CATEGORY_CONCURRENCY_LIMIT = 2; 
const limit = pLimit(CATEGORY_CONCURRENCY_LIMIT);

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

/**
 * Extracts the author as a string if possible; otherwise, returns null.
 * @param author - The author field from the RSS feed.
 * @returns A string if available, otherwise null.
 */
function extractAuthor(author: any): string | null {
  if (!author) return null;
  if (typeof author === "string") return author.trim();
  if (typeof author === "object" && author["$"] && typeof author["$"] === "string") {
    return author["$"].trim();
  }
  return null;
}

/**
 * Used to truncate strings in the logs (optional).
 */
function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

/**
 * Generates a URL-friendly slug from the given category.
 * @param category - The article's category.
 * @returns A slug string.
 */
function generateSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Main function to fetch, process, categorize, and save RSS articles.
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
  let totalArticlesSavedToDB = 0;
  let totalArticlesCategorized = 0;
  let totalArticlesSlugged = 0;
  let totalArticlesSkippedDueToCategorization = 0;
  let totalArticlesSkippedDueToMissingImage = 0;
  let totalArticlesSkippedDueToDuplicates = 0;
  let totalArticlesSkippedDueToDBError = 0;
  const categoryCounts: { [key: string]: number } = {};
  const failedFeeds: { id: string, name: string, error: string, failureCount: number }[] = [];



  await Promise.all(
    rssFeeds.map(async (feed) => {
      const feedLogs: string[] = [];
      const feedLog = (message: string) => {
        feedLogs.push(`[${feed.name}] ${message}`);
      };

      let feedArticlesFetched = 0;
      let feedArticlesFiltered = 0;
      let feedArticlesInDB = 0;
      let feedArticlesSaved = 0;

      try {
        feedLog(`Fetching feed: ${feed.url}`);
        const response = await axios.get(feed.url, { timeout: 5000, headers: { 'User-Agent': 'Mozilla/5.0' } });
        const parsedFeed = await parser.parseString(response.data);

        if (!parsedFeed.items || parsedFeed.items.length === 0) {
          feedLog(`No articles found.`);
          throw new Error("No articles found.");
        }

        const articles = parsedFeed.items;
        totalArticlesFetched += articles.length;
        feedArticlesFetched += articles.length;

        for (const item of articles) {
          const articleTitle = item.title || "Untitled";
          const articleLink = item.link || "";
          const articleDate = item.pubDate ? new Date(item.pubDate) : new Date();
          const articleSummary = item.contentSnippet || item.description || "No summary available.";
          const articleAuthor = item.creator || item.author || "Unknown";
          const articleRegion = feed.region || "Unknown";

          // Step 1: Filter articles within the last 24 hours.
          const timeDiff = now.getTime() - articleDate.getTime();
          const hoursDiff = timeDiff / (1000 * 3600);
          if (hoursDiff > 24) {
            feedLog(`Article "${truncate(articleTitle, 30)}" is > 24hrs. Stopped further processing.`);
            break;
          }
          totalArticlesFiltered++;
          feedArticlesFiltered++;

          // Step 2: Check for duplicates.
          const existingArticle = await prisma.savedArticle.findUnique({ where: { link: articleLink } });
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

          // Step 3: Attempt image extraction.
          let articleImage = item.enclosure?.url || item["media:content"]?.url || null;
          let imageSource = "RSS Feed";
          if (!articleImage) {
            articleImage = await extractImageFromArticle(articleLink);
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
            feedLog(`⚠️ Skipping article: "${truncate(articleTitle, 30)}" - No valid image found.`);
            totalArticlesSkippedDueToMissingImage++;
            continue;
          }
          feedLog(`✅ Image retrieved from: ${imageSource}`);

          // Step 4: Categorize the article (with retries) before saving.
          let articleCategory = "Uncategorized";
          let categorizationSuccess = false;
          for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
              articleCategory = await categorizeArticle(articleTitle, articleSummary);
              categorizationSuccess = true;
              break;
            } catch (err: unknown) {
              const error = err as { response?: { data?: string; status?: number }; message?: string };
              let errorMessage = "";
              if (error.response?.data && typeof error.response.data === "string") {
                const stripped = error.response.data.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
                if (!stripped.startsWith("Hugging Face - The AI community building the future")) {
                  errorMessage = stripped.substring(0, 100) + (stripped.length > 100 ? "..." : "");
                }
              } else if (error.message && typeof error.message === "string") {
                errorMessage = error.message.substring(0, 100) + (error.message.length > 100 ? "..." : "");
              } else {
                errorMessage = "Unknown error occurred.";
              }
              feedLog(`❌ Categorization failed for "${truncate(articleTitle, 50)}": ${errorMessage}`);
              if (attempt < MAX_RETRIES) {
                feedLog(`🔄 Retrying categorization in ${RETRY_DELAY_MS / 1000} seconds...`);
                await sleep(RETRY_DELAY_MS);
              }
            }
          }
          if (!categorizationSuccess) {
            totalArticlesSkippedDueToCategorization++;
            feedLog(`⚠️ Skipping article: "${truncate(articleTitle, 30)}" due to failed categorization.`);
            continue;
          }
          const slug = generateSlug(articleCategory);

          // Step 5: Save the article to the database only if categorization succeeded.
          try {
            await prisma.savedArticle.create({
              data: {
                title: articleTitle,
                date: articleDate,
                link: articleLink,
                summary: articleSummary,
                imageURL: articleImage,
                author: extractAuthor(articleAuthor),
                source: feed.name,
                region: feed.region,
                category: articleCategory,
                slug: slug
              }
            });
            totalArticlesSavedToDB++;
            feedArticlesSaved++;
            totalArticlesCategorized++; // Count as categorized since saved only if categorization succeeded.
            totalArticlesSlugged++;
            categoryCounts[articleCategory] = (categoryCounts[articleCategory] || 0) + 1;

            feedLog(
              `✅ Article Saved: "${truncate(articleTitle, 50)}"\n` +
              `   📂 Category: "${articleCategory}"\n` +
              `   🔗 Slug: "${slug}"`
            );            
          } catch (error) {
            const dbError = error as any;
            if (dbError.code === 'P2002') {
              totalArticlesSkippedDueToDuplicates++;
              feedLog(`⚠️ Duplicate article detected and skipped: "${truncate(articleTitle, 30)}"`);
            } else {
              totalArticlesSkippedDueToDBError++;
              feedLog(`❌ Error saving article "${truncate(articleTitle, 30)}": ${dbError}`);
            }
          }
        }

        // Feed-specific summary logs.
        feedLog(`🌐 Fetched RSS feed:  ${feed.url}`);
        feedLog(`✅ Articles Fetched:  ${String(feedArticlesFetched).padStart(5)}`);
        feedLog(`📅 Filtered Last 24h: ${String(feedArticlesFiltered).padStart(5)}`);
        feedLog(`⚠️  Skipped (In DB):   ${String(feedArticlesInDB).padStart(5)}`);
        feedLog(`✅ Saved to Database: ${String(feedArticlesSaved).padStart(5)}`);
        feedLog(`\n_____________________________________________________________________________`);

        // Reset failure count on successful fetch.
        await prisma.rSSFeed.update({
          where: { id: feed.id },
          data: { failureCount: 0 },
        });
      } catch (feedError) {
        feedLogs.push(`[${feed.name}] Error: ${(feedError as Error).message}`);
        feedLogs.forEach(line => logError(line));

        // Increment failure count.
        await prisma.rSSFeed.update({
          where: { id: feed.id },
          data: { failureCount: { increment: 1 } },
        });

        // Deactivate feed if it fails twice in a row.
        const updatedFeed = await prisma.rSSFeed.findUnique({
          where: { id: feed.id },
          select: { failureCount: true },
        });

        // Record this feed's failure.
        failedFeeds.push({
          id: feed.id,
          name: feed.name,
          error: (feedError as Error).message,
          failureCount: updatedFeed?.failureCount || 0,
        });

        if (updatedFeed && updatedFeed.failureCount >= 2) {
          await prisma.rSSFeed.update({
            where: { id: feed.id },
            data: { active: false },
          });
          logError(`🚨 RSS feed ${feed.name} has failed twice. Marking as inactive.`);
        }
        return;
      }
      feedLogs.forEach(line => logInfo(line));
    })
  );

  // Final summary logs.
  const endTime = new Date();
  const totalArticlesInDatabase = await prisma.savedArticle.count();
  const totalArticlesReady = totalArticlesFiltered - totalArticlesInDB;
  const numWidth = 5;

  logInfo(`\n============================== 📊 FINAL SUMMARY 📊 ==============================`);
  logInfo(`📑 Total Articles Fetched:                  ${String(totalArticlesFetched).padStart(numWidth)}`);
  logInfo(`📅 Total Articles Filtered (24h):           ${String(totalArticlesFiltered).padStart(numWidth)}`);
  logInfo(`🗄️  Total Articles Already in Database:      ${String(totalArticlesInDB).padStart(numWidth)}`);
  logInfo(`📝 Total Articles Ready for Processing:     ${String(totalArticlesReady).padStart(numWidth)}`);
  logInfo(`❌ Articles Skipped Due to Missing Image:   ${String(totalArticlesSkippedDueToMissingImage).padStart(numWidth)}`);
  logInfo(`❌ Articles Skipped Due to Duplicates:      ${String(totalArticlesSkippedDueToDuplicates).padStart(numWidth)}`);
  logInfo(`❌ Articles Skipped Due to DB Save Error:   ${String(totalArticlesSkippedDueToDBError).padStart(numWidth)}`);
  logInfo(`🚫 Total Articles Categorization Failure:   ${String(totalArticlesSkippedDueToCategorization).padStart(numWidth)}`);
  logInfo(`✅ Total Articles Successfully Categorized: ${String(totalArticlesCategorized).padStart(numWidth)}`);
  logInfo(`✅ Total Articles with Slugs:               ${String(totalArticlesSlugged).padStart(numWidth)}`);
  logInfo(`✅ Total Articles Saved to Database:        ${String(totalArticlesSavedToDB).padStart(numWidth)}`);
  logInfo(`🗂️  Total Articles in Database (updated):   ${String(totalArticlesInDatabase).padStart(numWidth)}`);

  logInfo(`\n🔍 Categorization Breakdown:`);
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const percentage = totalArticlesCategorized > 0 ? ((count / totalArticlesCategorized) * 100).toFixed(2) : "0.00";
    logInfo(`   - ${category.padEnd(30)} ${String(count).padStart(numWidth)} articles (${percentage}%)`);
  });

  // Replace your existing final logs for RSS feeds processed, database, and failed feeds with this snippet:

  logInfo(`🚀 Total RSS Feeds Processed:              ${String(rssFeeds.length).padStart(numWidth)}`);
  const totalRssFeeds = await prisma.rSSFeed.count();
  logInfo(`🗂️  Total RSS Feeds in Database:            ${String(totalRssFeeds).padStart(numWidth)}`);

  logInfo(`\n🚨 Failed RSS Feeds:                        ${String(failedFeeds.length).padStart(numWidth)}`);
  failedFeeds.forEach(feed => {
    logInfo(
      `   - ${feed.name.padEnd(30)} | ` +
      `Error: ${feed.error.padEnd(50)} | ` +
      `Failure Count: ${String(feed.failureCount).padStart(numWidth)}`
    );
  });


  logInfo(`Process ended at: ${endTime.toLocaleString()}`);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationSeconds = Math.floor((durationMs / 1000) % 60);
  const durationMinutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const durationHours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  logInfo(`Total duration: ${durationHours}h ${durationMinutes}m ${durationSeconds}s`);
}

// Immediately Invoked Async Function Expression (IIFE)
(async () => {
  try {
    await fetchAndCategorizeRSS();
  } catch (error) {
    logError(`🚨 Fatal Error in RSS Process: ${(error as Error).message}`);
  }
})();
