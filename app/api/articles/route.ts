// app/api/articles/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // ✅ Ensure UTC-based filtering
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0); // Forces 00:00 UTC

    const endOfToday = new Date();
    endOfToday.setUTCHours(23, 59, 59, 999); // Forces 23:59 UTC

    // ✅ Extract pagination parameters (optional)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // ✅ Extract optional region filter
    const region = searchParams.get('region'); // Allows filtering by region

    // ✅ Fetch articles from database with proper UTC filtering
    const articles = await prisma.savedArticle.findMany({
      where: {
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
        ...(region ? { region } : {}), // ✅ Conditionally apply region filter if provided
      },
      orderBy: { date: 'desc' },
      take: limit,
      skip: skip,
      select: {
        id: true,
        title: true,
        date: true,
        link: true,
        summary: true,
        imageURL: true,  // ✅ Ensure images are included
        author: true,
        source: true,
        category: true,
        region: true,
      },
    });

    // ✅ Return response with success flag
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
