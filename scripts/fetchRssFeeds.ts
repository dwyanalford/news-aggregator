// scripts/fetchRssFeeds.ts

import { fetchNewsItems } from '@/app/utils/fetchNewsItems';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function saveArticles() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    console.log('🚀 Fetching RSS feed articles...');

    let parsedCount = 0;
    let skippedCountTotal = 0;
    let savedCountTotal = 0;
    let failedFeedsCount = 0; // ✅ Track failed RSS feeds

    try {
        // Get all RSS feeds from the database
        const rssFeeds = await prisma.rSSFeed.findMany();

        if (rssFeeds.length === 0) {
            console.log('⚠️ No RSS feeds found in the database.');
            return;
        }

        // Fetch news articles from these feeds
        const fetchedNews = await fetchNewsItems(rssFeeds);

        for (const source of fetchedNews) {
            if (source.failed) {
                failedFeedsCount++;  // ✅ Increment failed count
                console.log(`❌ Failed to fetch RSS Feed: ${source.source} (${source.region})`);
                continue;  // ✅ Skip processing for failed feeds
            }

            let skippedCount = 0;
            let savedCountForFeed = 0;
            let filteredCount = source.filteredCount ?? 0;

            parsedCount += source.items.length;

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
                    savedCountForFeed++;
                    savedCountTotal++;
                } else {
                    skippedCount++;
                }
            }

            skippedCountTotal += skippedCount;

            console.log("\n=============================================================");
            console.log(`📌 RSS Feed Summary for: ${source.source}`);
            console.log("===============================================================");
            console.log(`🌍 Region: ${source.region}`);
            console.log(`📄 Total Articles in Feed: ${totalArticlesInFeed}`);
            console.log(`📅 Filtered for Today: ${filteredForToday}`);
            console.log(`⚠️ Skipped (Already in DB): ${skippedCount}`);
            console.log(`✅ Saved to Database: ${savedCountForFeed}`);
            console.log("================================================================\n");
        }

        // Query total articles in the database after this run
        const totalArticlesInDatabase = await prisma.savedArticle.count();
        const totalArticlesToday = await prisma.savedArticle.count({
            where: {
                date: {
                    gte: new Date(todayDate.setHours(0, 0, 0, 0)),
                    lt: new Date(todayDate.setHours(23, 59, 59, 999))
                }
            }
        });

        console.log("\n=============================================================");
        console.log("            📊 FINAL DATABASE SUMMARY");
        console.log("=============================================================");
        console.log(`📅 Total articles in database for today: ${totalArticlesToday}`);
        console.log(`🆕 New articles saved to database this run: ${savedCountTotal}`);
        console.log(`📦 Total articles in database: ${totalArticlesInDatabase}`);
        console.log(`❌ RSS Feeds Failed to Fetch: ${failedFeedsCount}`); // ✅ Now correctly displayed
        console.log("=============================================================\n");

        console.log('🎉 RSS feed fetch & save complete!');
    } catch (error) {
        console.error('❌ Error fetching or saving articles:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script manually
saveArticles();
