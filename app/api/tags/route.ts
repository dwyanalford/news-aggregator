// app/api/tags/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const articleId = req.nextUrl.searchParams.get('articleId');

  try {
    // If no articleId is provided, fetch all tags with their article counts
    if (!articleId) {
      const tags = await prisma.tag.findMany({
        where: {
          userSavedArticleTags: {
            some: {
              userId: session.user.id,
            },
          },
        },
        include: {
          userSavedArticleTags: {
            where: {
              userId: session.user.id,  // Only include the tags associated with the current user
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        tags: tags.map(tag => ({
          id: tag.id,
          name: tag.name,
          count: tag.userSavedArticleTags.length || 0,
        })),
      }, { status: 200 });
    }

    // If articleId is provided, fetch only tags related to that article (no count needed)
    const tagsForArticle = await prisma.tag.findMany({
      where: {
        userSavedArticleTags: {
          some: {
            userSavedArticle: {
              articleId: articleId,
            },
            userId: session.user.id,
          },
        },
      },
    });

    // Return tags related to the specific article
    return NextResponse.json({
      success: true,
      tags: tagsForArticle.map(tag => ({
        id: tag.id,
        name: tag.name,
      })),
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
