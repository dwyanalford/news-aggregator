// app/api/fetchRecentArticles/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const articles = await prisma.savedArticle.findMany({
      where: {
        date: {
          gte: twoDaysAgo,
          lte: now,
        },
      },
      orderBy: { date: 'desc' },
      // Remove pagination for now; you can remove 'take' when you're ready for all results.
      take: 10,
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