// app/api/fetchRecentArticles/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
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

    const articles = await prisma.savedArticle.findMany({
      where: {
        date: {
          gte: yesterdayStart, // Include yesterday
          lte: todayEnd, // Up to the end of today
        },
      },

      orderBy: { date: 'desc' },
      // Remove pagination for now; you can remove 'take' when you're ready for all results.
      // take: 30,
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
      },
    });

    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}