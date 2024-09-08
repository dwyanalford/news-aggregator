// app/api/articles/getSaved/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Named export to handle GET request
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    // Fetch saved articles for the authenticated user
    const savedArticles = await prisma.savedArticle.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        date: true,
        link: true,
        summary: true,
        imageURL: true,
      },
    });

    return NextResponse.json(savedArticles, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    return NextResponse.json({ error: 'Failed to fetch saved articles' }, { status: 500 });
  }
}
