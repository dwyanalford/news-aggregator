import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const activeFeeds = await prisma.rSSFeed.findMany({
      where: { active: true },
      select: {
        name: true,
        logo: true,
        url: true,
      },
    });

    return NextResponse.json({ success: true, data: activeFeeds });
  } catch (error) {
    console.error('Error fetching active RSS feeds:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
