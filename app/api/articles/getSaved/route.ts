// app\api\articles\getSaved\route.ts

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

    // Fetch saved articles for the authenticated user using UserSavedArticle join table
    const savedArticles = await prisma.userSavedArticle.findMany({
      where: { userId },
      select: {
        id: true,  // Include userSavedArticleId
        savedArticle: {  // Join and select from the related SavedArticle model
          select: {
            id: true,
            title: true,
            date: true,
            link: true,
            summary: true,
            imageURL: true,
          },
        },
      },
    });

    // Map the response to include both userSavedArticleId and article data
    const articles = savedArticles.map((userSavedArticle) => ({
      userSavedArticleId: userSavedArticle.id,  // Include userSavedArticleId in the response
      ...userSavedArticle.savedArticle,  // Spread savedArticle fields
    }));

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    return NextResponse.json({ error: 'Failed to fetch saved articles' }, { status: 500 });
  }
}
