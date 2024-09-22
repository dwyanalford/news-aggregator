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
    // If no articleId is provided, fetch all tags created by the user
    if (!articleId) {
      const tags = await prisma.tag.findMany({
        where: {
          userSavedArticleTags: {
            some: {
              userId: session.user.id,  // Fetch only the user's tags
            },
          },
        },
      });

      return NextResponse.json(tags, { status: 200 });
    }

    // If articleId is provided, fetch tags related to that article
    const tags = await prisma.tag.findMany({
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

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
