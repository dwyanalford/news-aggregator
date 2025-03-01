import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log("🟡 fetchRecentArticles API was called.");

  try {
    const now = new Date();

    // Get today's date at 00:00:00
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get yesterday's date at 00:00:00
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    // Get today's date at 23:59:59 to include all articles from today
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // Extract "category" (slug) from query params
    const { searchParams } = new URL(req.url);
    const slugParam = searchParams.get('slug');
    console.log("slugParam from query:", slugParam);

    // Build the "where" clause for the first query (today & yesterday)
    const whereClause: any = {
      date: {
        gte: yesterdayStart,
        lte: todayEnd,
      },
      region: 'USA', // Keep this if you only want USA articles
    };

    // Apply category filter if present
    if (slugParam) {
      whereClause.slug = slugParam;
    }

    // Fetch ALL articles from today & yesterday (NO LIMIT)
    let recentArticles = await prisma.savedArticle.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      select: {
        id: true,
        title: true,
        date: true,
        link: true,
        summary: true,
        imageURL: true,
        author: true,
        source: true,
        category: true,
        region: true,
        slug: true,
      },
    });

    console.log(`🟢 Found ${recentArticles.length} articles from today & yesterday.`);

    // If we have at least 16, return them immediately
    if (recentArticles.length >= 16) {
      return NextResponse.json({ success: true, data: recentArticles });
    }

    // Otherwise, fetch additional older articles to fill up to 16
    const remainingCount = 16 - recentArticles.length;

    console.log(`🟠 Fetching ${remainingCount} older articles to fill.`);

    const olderArticles = await prisma.savedArticle.findMany({
      where: {
        slug: slugParam, // Keep it within the same category
        region: 'USA', // Ensure only relevant region
        date: { lt: yesterdayStart }, // Fetch articles older than yesterday
      },
      orderBy: { date: 'desc' }, // Get the most recent older ones first
      take: remainingCount, // Fetch only what's needed
      select: {
        id: true,
        title: true,
        date: true,
        link: true,
        summary: true,
        imageURL: true,
        author: true,
        source: true,
        category: true,
        region: true,
        slug: true,
      },
    });

    console.log(`🟢 Retrieved ${olderArticles.length} older articles.`);

    // Merge the two sets of articles
    const allArticles = [...recentArticles, ...olderArticles];

    return NextResponse.json({ success: true, data: allArticles });

  } catch (error) {
    console.error('🔴 Error fetching recent articles:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
