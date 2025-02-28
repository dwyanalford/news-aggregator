// app/api/fetchRecentArticles/route.ts

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

    // Build the "where" clause
    const whereClause: any = {
      date: {
        gte: yesterdayStart,
        lte: todayEnd,
      },
      // If you only want USA articles, uncomment or keep this:
      region: 'USA',
    };

    // Filter by slug if present
    
if (slugParam) {
  whereClause.slug = slugParam;
}

    const articles = await prisma.savedArticle.findMany({
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

    console.log("API Response Data:", articles);

    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}