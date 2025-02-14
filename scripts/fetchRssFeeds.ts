// scripts/fetchRssFeeds.ts

import { fetchNewsItems } from '@/app/utils/fetchNewsItems';
import { logInfo, logError } from '@/app/utils/logger';  // ✅ Import logging functions
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function saveArticles() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    logInfo('🚀 Fetching RSS feed articles...');

    let parsedCount = 0;
    let skippedCountTotal = 0;
    let savedCountTotal = 0;
    let failedFeedsCount = 0;

    try {
        const rssFeeds = await prisma.rSSFeed.findMany();

        if (rssFeeds.length === 0) {
            logInfo('⚠️ No RSS feeds found in the database.');
            return;
        }

        const fetchedNews = await fetchNewsItems(rssFeeds);

        for (const source of fetchedNews) {
            if (source.failed) {
                failedFeedsCount++;

                // ✅ Mark the RSS feed as inactive in the database
                await prisma.rSSFeed.updateMany({
                    where: { url: source.url },
                    data: { active: false },
                });

                logError(`❌ RSS Feed Failed: ${source.source}`);
                logError(`🔗 URL: ${source.url}`);
                logError(`🛑 Error: ${source.errorMessage || "Unknown issue"}`); // ✅ Ensure correct property name

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

                    logInfo(`✅ Saving article: "${article.title}" to database.`);
                    savedCountForFeed++;
                    savedCountTotal++;
                } else {
                    skippedCount++;
                }
            }

            skippedCountTotal += skippedCount;

            logInfo("\n=============================================================");
            logInfo(`📌 RSS Feed Summary for: ${source.source}`);
            logInfo("===============================================================");
            logInfo(`🌍 Region: ${source.region}`);
            logInfo(`📄 Total Articles in Feed: ${totalArticlesInFeed}`);
            logInfo(`📅 Filtered for Today: ${filteredForToday}`);
            logInfo(`⚠️ Skipped (Already in DB): ${skippedCount}`);
            logInfo(`✅ Saved to Database: ${savedCountForFeed}`);
            logInfo("================================================================\n");
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

        logInfo("\n=============================================================");
        logInfo("            📊 FINAL DATABASE SUMMARY");
        logInfo("=============================================================");
        logInfo(`📅 Total articles in database for today: ${totalArticlesToday}`);
        logInfo(`🆕 New articles saved to database this run: ${savedCountTotal}`);
        logInfo(`📦 Total articles in database: ${totalArticlesInDatabase}`);
        logInfo(`❌ RSS Feeds Failed to Fetch: ${failedFeedsCount}`);
        logInfo("=============================================================\n");

        logInfo('🎉 RSS feed fetch & save complete!');
    } catch (error) {
        logError(`❌ Error fetching or saving articles: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script manually
saveArticles();
