// File: scripts/fetchAndCategorizeRSS.ts

import axios from 'axios';
import RSSParser from 'rss-parser';
import { logInfo, logError } from '@/app/utils/logger';
import { saveArticleToDatabase } from '@/app/utils/saveArticleToDatabase';
import { extractImageFromArticle } from '@/app/utils/extractImageFromArticle';
import { PrismaClient } from '@prisma/client';
import { categorizeArticle } from '@/app/utils/categorizeArticle';

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

/**
 * Main function to fetch and process RSS feeds.
 */
export async function fetchAndCategorizeRSS() {
    const rssFeeds = await getRSSFeedsFromDB();

    if (rssFeeds.length === 0) {
        logError("⚠️ No active RSS feeds found in the database.");
        return;
    }

    logInfo(`🚀 Running Categorization and RSS Fetch Script - Processing ${rssFeeds.length} feeds`);

    // Get current date and time
    const now = new Date();

    // Initialize counters and storage for summaries
    let totalArticlesFetched = 0;
    let totalArticlesFiltered = 0;
    let totalArticlesInDB = 0;
    let totalArticlesCategorized = 0;
    let totalArticlesSkippedDueToCategorization = 0;
    let totalArticlesSavedToDB = 0;
    const categoryCounts: { [key: string]: number } = {};
    const failedFeeds: { id: string; name: string; error: string }[] = [];

    for (const feed of rssFeeds) {
      // Initialize per-feed counters
    let feedArticlesFetched = 0;
    let feedArticlesFiltered = 0;
    let feedArticlesInDB = 0;
    let feedArticlesSaved = 0;
        logInfo("\n=======================================================================================");
        logInfo(`📢 RSS Feed Summary for: ${feed.name.padEnd(25)}`);
        logInfo("_______________________________________________________________");

        try {
            logInfo(`🌐 Fetching RSS feed: ${feed.url}`);

            const response = await axios.get(feed.url, { timeout: 5000, headers: { 'User-Agent': 'Mozilla/5.0' } });
            const parsedFeed = await parser.parseString(response.data);

            if (!parsedFeed.items || parsedFeed.items.length === 0) {
                logError(`⚠️ No articles found in feed: ${feed.name}`);
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

                // Check if the article is within the last 24 hours, just change number "24" to "48" for 2 days etc etc.
                const timeDiff = now.getTime() - articleDate.getTime();
                const hoursDiff = timeDiff / (1000 * 3600);
                if (hoursDiff > 24) {
                    continue;
                }
                totalArticlesFiltered++;
                feedArticlesFiltered++;

                // Check if the article is already in the database
                const existingArticle = await prisma.savedArticle.findUnique({
                    where: { link: articleLink }
                });

                if (existingArticle) {
                    totalArticlesInDB++;
                    feedArticlesInDB++;
                    continue;
                }

                // Retry mechanism for categorization
                let articleCategory = "Uncategorized";
                let categorizationSuccess = false;
                for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                    try {
                        articleCategory = await categorizeArticle(articleTitle, articleSummary);
                        categorizationSuccess = true;
                        break; // Exit loop on success
                    } catch (error) {
                        logError(`❌ Categorization failed for article "${articleTitle}" from "${feed.name}": ${(error as Error).message}`);
                        if (attempt < MAX_RETRIES) {
                            logInfo(`🔄 Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
                            await sleep(RETRY_DELAY_MS);
                        }
                    }
                }

                if (!categorizationSuccess) {
                    totalArticlesSkippedDueToCategorization++;
                    continue;
                }

                totalArticlesCategorized++;
                // logInfo(`📝 Article: "${articleTitle}"`);
                logInfo(`   Assigned Category: ${articleCategory}`);

                // Update category count
                if (categoryCounts[articleCategory]) {
                    categoryCounts[articleCategory]++;
                } else {
                    categoryCounts[articleCategory] = 1;
                }

                // Extract image for the article
                let articleImage = item.enclosure?.url || item["media:content"]?.url || null;
                if (!articleImage) {
                    articleImage = await extractImageFromArticle(articleLink);
                }
                if (!articleImage) {
                    articleImage = `${BACKUP_IMAGE_FOLDER}${feed.name.toLowerCase().replace(/\s+/g, '')}.webp`;
                }
                if (!articleImage) {
                    articleImage = DEFAULT_IMAGE_PATH;
                }

                // Save the categorized article to the database
                await saveArticleToDatabase({
                    title: articleTitle,
                    date: articleDate,
                    link: articleLink,
                    summary: articleSummary,
                    imageURL: articleImage,
                    author: articleAuthor,
                    source: feed.name,
                    region: articleRegion,
                    category: articleCategory
                }, process.env.SYSTEM_USER_ID as string);

                totalArticlesSavedToDB++;
                feedArticlesSaved++;
            }

                // ✅ Summary for the current RSS feed
                logInfo("============================================================");
                logInfo(`✅ Articles Fetched:      ${String(feedArticlesFetched).padStart(5)}`);
                logInfo(`📅 Filtered Last 24h:     ${String(feedArticlesFiltered).padStart(5)}`);
                logInfo(`⚠️  Skipped (In DB):       ${String(feedArticlesInDB).padStart(5)}`);
                logInfo(`✅ Saved to Database:     ${String(feedArticlesSaved).padStart(5)}`);
                logInfo("============================================================");

        } catch (feedError) {
            failedFeeds.push({ id: feed.id, name: feed.name, error: (feedError as Error).message });
        }
    }

    const totalArticlesInDatabase = await prisma.savedArticle.count();

    // Summarized Database and Categorization Output
    logInfo("\n============================== 📊 FINAL SUMMARY 📊 ==============================");
    logInfo(`📑 Total Articles Fetched:                   ${String(totalArticlesFetched).padStart(5)}`);
    logInfo(`📅 Total Articles Filtered (48h):            ${String(totalArticlesFiltered).padStart(5)}`);
    logInfo(`🗄️ Total Articles Already in Database:       ${String(totalArticlesInDB).padStart(5)}`);
    logInfo(`📌 Total Articles Successfully Categorized:  ${String(totalArticlesCategorized).padStart(5)}`);
    logInfo(`🚫 Total Articles Categorization Failure:    ${String(totalArticlesSkippedDueToCategorization).padStart(5)}`);
    logInfo(`✅ Total Articles Saved to Database:         ${String(totalArticlesSavedToDB).padStart(5)}`);
    logInfo(`🗂️ Total Articles in Database (update):      ${String(totalArticlesInDatabase).padStart(5)}`);

    logInfo("\n🔍 Categorization Breakdown:");
    Object.entries(categoryCounts).forEach(([category, count]) => {
        const percentage = ((count / totalArticlesCategorized) * 100).toFixed(2);
        logInfo(`   - ${category}: ${count} articles (${percentage}%)`);
    });

    if (failedFeeds.length > 0) {
        logInfo(`❌ RSS Feeds Failed: ${failedFeeds.length}`);
        failedFeeds.forEach(feed => logInfo(`   - ${feed.name} | Error: ${feed.error}`));
    }

    logInfo("===============================================================================");

}

// Top-level invocation
(async () => {
    try {
        await fetchAndCategorizeRSS();
    } catch (error) {
        logError(`🚨 Fatal Error in RSS Fetching Process: ${(error as Error).message}`);
    }
})();