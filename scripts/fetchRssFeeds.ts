// app/utils/fetchRSSFeeds.ts

console.log("🚀 Script is running...");

import axios from 'axios';
import RSSParser from 'rss-parser';
import { logInfo, logError } from '@/app/utils/logger'; // Logging functions
import { saveArticleToDatabase } from '@/app/utils/saveArticleToDatabase'; // Function to save articles
import { extractImageFromArticle } from '@/app/utils/extractImageFromArticle'; // Function to extract images
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const parser = new RSSParser();

// Default and backup image paths
const DEFAULT_IMAGE_PATH = "/images/default.webp";
const BACKUP_IMAGE_FOLDER = "/images/rss_backup/";

/**
 * Fetches RSS feeds from the database.
 */
async function getRSSFeedsFromDB() {
    try {
        const feeds = await prisma.rSSFeed.findMany({
            where: { active: true }, // ✅ Only fetch active feeds
        });
        return feeds.map(feed => ({
            id: feed.id,
            name: feed.name,
            url: feed.url,
            region: feed.region || "Unknown",
            failureCount: feed.failureCount || 0, // ✅ Track failure count
        }));
    } catch (error) {
        logError(`❌ Error fetching RSS feeds from database: ${(error as Error).message}`);
        return [];
    }
}

/**
 * Fetches and processes RSS feed articles.
 */
export async function fetchRSSFeeds() {
    const rssFeeds = await getRSSFeedsFromDB();

    if (rssFeeds.length === 0) {
        logError("⚠️ No active RSS feeds found in the database.");
        return;
    }

    logInfo(`🚀 Starting RSS Feed Fetching Process - Processing ${rssFeeds.length} feeds`);

    // Get today's date in UTC
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let totalArticlesFetched = 0;
    let filteredTodayTotal = 0;
    let totalSkipped = 0;
    let totalSaved = 0;
    let failedFeeds: { id: string; name: string; error: string }[] = [];

    for (const feed of rssFeeds) {
        let totalArticles = 0;
        let filteredToday = 0;
        let skipped = 0;
        let saved = 0;

        logInfo("\n=======================================================================================");
        logInfo(`📢 RSS Feed Summary for: ${feed.name.padEnd(25)}`);
        logInfo("_______________________________________________________________");

        try {
            logInfo(`🌐 Fetching RSS url feed: ${feed.url}`);

            const response = await axios.get(feed.url, { timeout: 5000, headers: { 'User-Agent': 'Mozilla/5.0' } });
            const parsedFeed = await parser.parseString(response.data);

            if (!parsedFeed.items || parsedFeed.items.length === 0) {
                logError(`⚠️ No articles found in feed: ${feed.name}`);
                throw new Error("No articles found.");
            }

            totalArticles = parsedFeed.items.length;

            for (const item of parsedFeed.items) {
                try {
                    const articleTitle = item.title || "Untitled";
                    const articleLink = item.link || "";
                    const articleDate = item.pubDate ? new Date(item.pubDate) : new Date();
                    const articleSummary = item.contentSnippet || item.description || "No summary available.";
                    const articleAuthor = item.creator || item.author;
                    const articleRegion = feed.region || "Unknown";

                    // Ensure the article has a valid link
                    if (!articleLink) {
                        logError(`❌ Skipping article "${articleTitle}" from ${feed.name} due to missing link.`);
                        continue;
                    }

                    // Check if the article is from today
                    const articleUTCDate = new Date(articleDate);
                    articleUTCDate.setUTCHours(0, 0, 0, 0);
                    if (articleUTCDate.getTime() !== today.getTime()) {
                        continue;
                    }

                    filteredToday++;

                    // Extract image for the article
                    let articleImage = item.enclosure?.url || item["media:content"]?.url || null;
                    if (!articleImage) {
                        logInfo("🔎 No RSS image found");
                        articleImage = await extractImageFromArticle(articleLink);
                    }

                    // Fallback to backup image if needed
                    if (!articleImage) {
                        const backupImagePath = `${BACKUP_IMAGE_FOLDER}${feed.name.toLowerCase().replace(/\s+/g, '')}.webp`;
                        logInfo(`🖼️ Using backup image for "${articleTitle}": ${backupImagePath}`);
                        articleImage = backupImagePath;
                    }

                    // Fallback to default image if all else fails
                    if (!articleImage) {
                        logInfo(`🖼️ Using default image for "${articleTitle}"`);
                        articleImage = DEFAULT_IMAGE_PATH;
                    }

                    // Check if the article is already in the database before saving
                    const existingArticle = await prisma.savedArticle.findUnique({
                        where: { link: articleLink }
                    });

                    if (existingArticle) {
                        skipped++;
                    } else {
                        await saveArticleToDatabase({
                            title: articleTitle,
                            date: articleDate,
                            link: articleLink,
                            summary: articleSummary,
                            imageURL: articleImage,
                            author: articleAuthor,
                            source: feed.name,
                            region: articleRegion
                        }, process.env.SYSTEM_USER_ID as string);

                        saved++;
                    }

                } catch (articleError) {
                    logError(`❌ Failed processing article in ${feed.name}: ${(articleError as Error).message}`);
                }
            }

            // ✅ Reset fail count on successful fetch
            await prisma.rSSFeed.update({
                where: { id: feed.id },
                data: { failureCount: 0 }
            });

        } catch (feedError) {
            failedFeeds.push({ id: feed.id, name: feed.name, error: (feedError as Error).message });

            // ✅ Increment failure count
            await prisma.rSSFeed.update({
                where: { id: feed.id },
                data: { failureCount: { increment: 1 } }
            });

            // ✅ Deactivate feed if it fails twice in a row
            const updatedFeed = await prisma.rSSFeed.findUnique({
                where: { id: feed.id },
                select: { failureCount: true }
            });

            if (updatedFeed && updatedFeed.failureCount >= 2) {
                await prisma.rSSFeed.update({
                    where: { id: feed.id },
                    data: { active: false }
                });
                logError(`🚨 RSS feed ${feed.name} has failed twice. Marking as inactive.`);
            }
        }

        totalSaved += saved;
        filteredTodayTotal += filteredToday;
        totalArticlesFetched += totalArticles;
        totalSkipped += skipped;

        logInfo(`🌍 Region:             ${feed.region}`);
        logInfo(`✅ Articles Fetched:   ${String(totalArticles).padStart(5)}`);
        logInfo(`📅 Filtered Today:     ${String(filteredToday).padStart(5)}`);
        logInfo(`⚠️ Skipped (In DB):     ${String(skipped).padStart(5)}`);
        logInfo(`✅ Saved to Database:  ${String(saved).padStart(5)}`);
        logInfo("=============================================================");
    }

    // Final Summary
    logInfo("\n=============================================================");
    logInfo("               📊 FINAL DATABASE SUMMARY");
    logInfo("=============================================================");
    logInfo(`📑 Total Articles Fetched:     ${String(totalArticlesFetched).padStart(5)}`);
    logInfo(`📅 Total Articles Filtered:    ${String(filteredTodayTotal).padStart(5)}`);
    logInfo(`⚠️ Total Skipped Articles:      ${String(totalSkipped).padStart(5)}`);
    logInfo(`✅ Total Saved Articles:       ${String(totalSaved).padStart(5)}`);
    logInfo(`📦 Total Articles in Database: ${String(await prisma.savedArticle.count()).padStart(5)}`);
    logInfo("-------------------------------------------------------------");
    logInfo(`❌ RSS Feeds Failed:           ${String(failedFeeds.length).padStart(5)}`);

    if (failedFeeds.length > 0) {
        failedFeeds.forEach(feed => logInfo(`   - ❌ ${feed.name} | Error: ${feed.error}`));
    }

    logInfo("=============================================================");
}

logInfo("=============================================================");

// Top-level invocation
(async () => {
    try {
        await fetchRSSFeeds();
    } catch (error) {
        logError(`🚨 Fatal Error in RSS Fetching Process: ${(error as Error).message}`);
    }
})();