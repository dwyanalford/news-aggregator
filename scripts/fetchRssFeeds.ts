// scripts/fetchRssFeeds.ts

import { fetchNewsItems } from '@/app/utils/fetchNewsItems';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// ✅ Create logs directory if it doesn’t exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// ✅ Generate log file name (e.g., logs/rss_feed_log_2025-02-14.txt)
const logFilePath = path.join(logsDir, `rss_feed_log_${new Date().toISOString().split('T')[0]}.txt`);

// ✅ Function to log both to console and file
function logMessage(message: string) {
    console.log(message);
    fs.appendFileSync(logFilePath, message + '\n', 'utf8');
}

async function saveArticles() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    logMessage('🚀 Fetching RSS feed articles...');

    let parsedCount = 0;
    let skippedCountTotal = 0;
    let savedCountTotal = 0;
    let failedFeedsCount = 0;

    try {
        const rssFeeds = await prisma.rSSFeed.findMany();

        if (rssFeeds.length === 0) {
            logMessage('⚠️ No RSS feeds found in the database.');
            return;
        }

        const fetchedNews = await fetchNewsItems(rssFeeds);

        for (const source of fetchedNews) {
            if (source.failed) {
                failedFeedsCount++;
                continue;
            }

            let skippedCount = 0;
            let savedCountForFeed = 0;
            parsedCount += source.items.length;

            let filteredCount = source.filteredCount ?? 0;
            const totalArticlesInFeed = source.items.length;
            const filteredForToday = filteredCount;

            for (const article of source.items) {
                const existingArticle = await prisma.savedArticle.findFirst({
                    where: {
                        link: article.link ?? "",
                        date: new Date(article.pubDate),
                    },
                });

                if (!existingArticle) {
                    await prisma.savedArticle.create({
                        data: {
                            title: article.title,
                            date: new Date(article.pubDate),
                            link: article.link ?? "",
                            summary: article.description,
                            imageURL: article.imageURL ?? "",
                            author: article.author ?? "",
                            source: source.source,
                            region: source.region ?? "Unknown",
                            category: "Uncategorized",
                        },
                    });
                    logMessage(`✅ Saving article: "${article.title}" to database.`);
                    savedCountForFeed++;
                    savedCountTotal++;
                } else {
                    skippedCount++;
                }
            }

            skippedCountTotal += skippedCount;

            logMessage("\n=============================================================");
            logMessage(`📌 RSS Feed Summary for: ${source.source}`);
            logMessage("===============================================================");
            logMessage(`🌍 Region: ${source.region}`);
            logMessage(`📄 Total Articles in Feed: ${totalArticlesInFeed}`);
            logMessage(`📅 Filtered for Today: ${filteredForToday}`);
            logMessage(`⚠️ Skipped (Already in DB): ${skippedCount}`);
            logMessage(`✅ Saved to Database: ${savedCountForFeed}`);
            logMessage(`❌ RSS Feeds Failed to Fetch: ${failedFeedsCount}`);
            logMessage("================================================================\n");
        }

        const totalArticlesInDatabase = await prisma.savedArticle.count();
        const totalArticlesToday = await prisma.savedArticle.count({
            where: {
                date: {
                    gte: new Date(todayDate.setHours(0, 0, 0, 0)),
                    lt: new Date(todayDate.setHours(23, 59, 59, 999)),
                }
            }
        });

        logMessage("\n=============================================================");
        logMessage("            📊 FINAL DATABASE SUMMARY");
        logMessage("=============================================================");
        logMessage(`📅 Total articles in database for today: ${totalArticlesToday}`);
        logMessage(`🆕 New articles saved to database this run: ${savedCountTotal}`);
        logMessage(`📦 Total articles in database: ${totalArticlesInDatabase}`);
        logMessage(`❌ RSS Feeds Failed to Fetch: ${failedFeedsCount}`);
        logMessage("=============================================================\n");

        logMessage('🎉 RSS feed fetch & save complete!');
    } catch (error) {
        logMessage(`❌ Error fetching or saving articles: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script manually
saveArticles();
