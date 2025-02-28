import axios from 'axios';
import RSSParser from 'rss-parser';
import { logInfo, logError } from '@/app/utils/logger';
import { extractImageFromArticle } from '@/app/utils/extractImageFromArticle';
import { PrismaClient } from '@prisma/client';
import { categorizeArticle } from '@/app/utils/categorizeArticle';
import pLimit from 'p-limit'; // to control the number of concurrent categorization requests


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

const CATEGORY_CONCURRENCY_LIMIT = 3; 
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
  if (!author) return null; // ✅ If there's no author, return null
  if (typeof author === "string") return author.trim(); // ✅ If it's already a string, return it (trimmed)
  
  if (typeof author === "object" && author["$"] && typeof author["$"] === "string") {
    return author["$"].trim(); // ✅ Extract the author's name if it's inside an object
  }

  return null; // ✅ Default to null if we can't extract a valid string
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
  let totalArticlesSkippedDueToDBError = 0;


  await Promise.all(rssFeeds.map(async (feed) => {
    // Create a buffer for feed-specific logs
    const feedLogs: string[] = [];

    // Helper function for logging within this feed
    const feedLog = (message: string) => {
      feedLogs.push(`[${feed.name}] ${message}`);
    };

    let feedArticlesFetched = 0;
    let feedArticlesFiltered = 0;
    let feedArticlesInDB = 0;
    let feedArticlesSaved = 0;

    // Declare articlesToSave array for this feed
    const articlesToSave: any[] = [];

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
          feedLog(`Older than 24hrs. Stopping further processing.`);
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
      await Promise.all(
        articlesToCategorize.map(article =>
          limit(async () => {
            // Extra duplicate check to ensure we only categorize articles that haven't been saved yet
            const alreadyExists = await prisma.savedArticle.findUnique({
              where: { link: article.link }
            });
            if (alreadyExists) {
              feedLog(`⚠️ Duplicate article already in DB: "${truncate(article.title, 30)}", skipping categorization.`);
              return;
            }
            feedLog(`Categorizing article: "${truncate(article.title, 30)}"`);
            let articleCategory = "Uncategorized";
            let categorizationSuccess = false;

            // Retry mechanism for categorization and cleaning up error message in logs
            for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
              try {
                articleCategory = await categorizeArticle(article.title, article.summary);
                categorizationSuccess = true;
                break; // ✅ Exit loop on success
              } catch (err: unknown) {
                const error = err as { response?: { data?: string; status?: number }; message?: string };
                let errorMessage = "";
            
                if (error.response?.data && typeof error.response.data === "string") {
                  // ✅ Remove all HTML tags and extra spaces, then truncate to 100 characters.
                  const stripped = error.response.data.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
            
                  // ✅ Ignore generic Hugging Face errors and only log meaningful content.
                  if (!stripped.startsWith("Hugging Face - The AI community building the future")) {
                    errorMessage = stripped.substring(0, 100) + (stripped.length > 100 ? "..." : "");
                  }
                } else if (error.message && typeof error.message === "string") {
                  errorMessage = error.message.substring(0, 100) + (error.message.length > 100 ? "..." : "");
                } else {
                  errorMessage = "Unknown error occurred.";
                }
            
                // ✅ Log only if there's a meaningful error message
                if (errorMessage) {
                  feedLog(`❌ Categorization failed for "${truncate(article.title, 50)}": ${errorMessage}`);
                }
            
                if (attempt < MAX_RETRIES) {
                  feedLog(`🔄 Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
                  await sleep(RETRY_DELAY_MS);
                }
              }
            }
            
            

            if (!categorizationSuccess) {
              totalArticlesSkippedDueToCategorization++;
              return;
            }

            totalArticlesCategorized++;
            feedLog(`✅ Categorized article: ${article.title}`);
            feedLog(`🔍 Assigned Category: ${articleCategory}`);

            // Image extraction remains the same
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
              feedLog(`⚠️ Skipping article: "${truncate(article.title, 30)}" - No valid image found.`);
              totalArticlesSkippedDueToMissingImage++;
              return;
            }

            feedLog(`✅ Image retrieved from: ${imageSource}`);

            // Add the fully prepared article to the batch save array.
            articlesToSave.push({
              title: article.title,
              date: article.date,
              link: article.link,
              summary: article.summary,
              imageURL: articleImage,
              author: extractAuthor(article.author), // ✅ Fix applied here
              source: feed.name,
              region: feed.region,
              category: articleCategory
            });
            

            feedLog(`✅ Article from ${feed.name} added to batch save.`);
            categoryCounts[articleCategory] = (categoryCounts[articleCategory] || 0) + 1;
          })
        )
      );

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
              feedLog(`⚠️ Duplicate article detected and skipped: ${truncate(article.title, 30)}`);
            } else {
              totalArticlesSkippedDueToDBError++; // ✅ Track unexpected DB errors separately
              feedLog(`❌ Error saving article "${article.title}": ${dbError}`);
            }
          }
        }
      }

      // ✅ Summary for the processing of individual RSS feeds
      feedLog(`🌐 Fetched RSS feed:  ${feed.url}`);
      feedLog(`✅ Articles Fetched:  ${String(feedArticlesFetched).padStart(5)}`);
      feedLog(`📅 Filtered Last 24h: ${String(feedArticlesFiltered).padStart(5)}`);
      feedLog(`⚠️  Skipped (In DB):   ${String(feedArticlesInDB).padStart(5)}`);
      feedLog(`✅ Saved to Database: ${String(feedArticlesSaved).padStart(5)}`);
      feedLog(`\n_____________________________________________________________________________`);
      
      // Flush the feed-specific logs
      feedLogs.forEach(line => logInfo(line));

      // ✅ Reset fail count on successful fetch
      await prisma.rSSFeed.update({
        where: { id: feed.id },
        data: { failureCount: 0 },
      });

    } catch (feedError) {
      failedFeeds.push({ id: feed.id, name: feed.name, error: (feedError as Error).message });
    
      // ✅ Increment failure count
      await prisma.rSSFeed.update({
        where: { id: feed.id },
        data: { failureCount: { increment: 1 } },
      });
    
      // ✅ Deactivate feed if it fails twice in a row
      const updatedFeed = await prisma.rSSFeed.findUnique({
        where: { id: feed.id },
        select: { failureCount: true },
      });
    
      if (updatedFeed && updatedFeed.failureCount >= 2) {
        await prisma.rSSFeed.update({
          where: { id: feed.id },
          data: { active: false },
        });
        logError(`🚨 RSS feed ${feed.name} has failed twice. Marking as inactive.`);
      }
    
      // Also flush any buffered feed logs for this feed in error
      feedLogs.push(`[${feed.name}] Error: ${(feedError as Error).message}`);
      feedLogs.forEach(line => logError(line));
    }
    
  }));

  const endTime = new Date();
  const totalArticlesInDatabase = await prisma.savedArticle.count();
  const totalArticlesReady = totalArticlesFiltered - totalArticlesInDB;

  const numWidth = 5; // Set width for numeric alignment

logInfo(`\n============================== 📊 FINAL SUMMARY 📊 ==============================`);

// Right-align numbers using padStart(numWidth)
logInfo(`📑 Total Articles Fetched:                  ${String(totalArticlesFetched).padStart(numWidth)}`);
logInfo(`📅 Total Articles Filtered (24h):           ${String(totalArticlesFiltered).padStart(numWidth)}`);
logInfo(`🗄️  Total Articles Already in Database:      ${String(totalArticlesInDB).padStart(numWidth)}`);
logInfo(`📝 Total Articles Ready for Categorization: ${String(totalArticlesReady).padStart(numWidth)}`);
logInfo(`🚫 Total Articles Categorization Failure:   ${String(totalArticlesSkippedDueToCategorization).padStart(numWidth)}`);
logInfo(`✅ Total Articles Successfully Categorized: ${String(totalArticlesCategorized).padStart(numWidth)}`);
logInfo(`❌ Articles Skipped Due to Missing Image:   ${String(totalArticlesSkippedDueToMissingImage).padStart(numWidth)}`);
logInfo(`❌ Articles Skipped Due to Duplicates:      ${String(totalArticlesSkippedDueToDuplicates).padStart(numWidth)}`);
logInfo(`❌ Articles Skipped Due to DB Save Error:   ${String(totalArticlesSkippedDueToDBError).padStart(numWidth)}`); 
logInfo(`✅ Total Articles Saved to Database:        ${String(totalArticlesSavedToDB).padStart(numWidth)}`);
logInfo(`🗂️  Total Articles in Database (updated):   ${String(totalArticlesInDatabase).padStart(numWidth)}`);

  logInfo(`\n🔍 Categorization Breakdown:`);
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const percentage = totalArticlesCategorized > 0 ? ((count / totalArticlesCategorized) * 100).toFixed(2) : "0.00";
    logInfo(`   - ${category.padEnd(30)} ${String(count).padStart(numWidth)} articles (${percentage}%)`);
  });

  const totalRssFeeds = await prisma.rSSFeed.count(); 
  logInfo(`🗂️ Total RSS Feeds in Database: ${String(totalRssFeeds).padStart(numWidth)}`);
  logInfo(`🚀 Total RSS Feeds Processed: ${String(rssFeeds.length).padStart(numWidth)}`);

  if (failedFeeds.length > 0) {
    logInfo(`❌ Total RSS Feeds Failed:       ${String(failedFeeds.length).padStart(numWidth)}`);
    failedFeeds.forEach(feed => logInfo(`   - ${feed.name} | Error: ${feed.error}`));
  } else {
    logInfo(`❌ Total RSS Feeds Failed:       ${"0".padStart(numWidth)}`);
  }
  
  logInfo(`Process ended at: ${endTime.toLocaleString()}`);

  const durationMs = endTime.getTime() - startTime.getTime();
  const durationSeconds = Math.floor((durationMs / 1000) % 60);
  const durationMinutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const durationHours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  logInfo(`Total duration: ${durationHours}h ${durationMinutes}m ${durationSeconds}s`);
  }

/**
 * ✅ Immediately Invoked Async Function Expression (IIFE)
 * --------------------------------------------------------
 * This function **automatically starts** the RSS fetching & categorization process.
 * 
 * 🔹 Why is this at the bottom?
 * - Ensures all functions/variables are **defined before execution**.
 * - Allows `await` usage at the top level without needing a separate function call.
 * - Used for **standalone scripts** that should run immediately when executed.
 * 
 * 🔹 What does it do?
 * - Calls `fetchAndCategorizeRSS()`, which:
 *   - Fetches, filters, and categorizes RSS feed articles.
 *   - Extracts article images and saves valid ones to the database.
 * 
 * 🔹 Error Handling:
 * - Prevents **script crashes** by catching fatal errors and logging them.
 */

(async () => {
  try {
    await fetchAndCategorizeRSS();  // ✅ Start the RSS fetch & categorization process
  } catch (error) {
    logError(`🚨 Fatal Error in RSS Process: ${(error as Error).message}`);  // ❌ Log unexpected errors
  }
})();
