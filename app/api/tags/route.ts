// app/api/tags/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import if needed

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions); // Fetch the user session

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Return error if not authenticated
  }

  // Extract articleId from the request URL
  const articleId = req.nextUrl.searchParams.get('articleId');

  if (!articleId) {
    return NextResponse.json({ error: 'articleId is required' }, { status: 400 });
  }

  try {
    /// Fetch all tags created by the authenticated user for the specific article
    const tags = await prisma.tag.findMany({
      where: {
        userSavedArticleTags: {
          some: {
            userSavedArticle: {
              articleId: articleId,  // Filter by the article ID
            },
            userId: session.user.id,  // Filter by the logged-in user's ID
          },
        },
      },
    });

    return NextResponse.json(tags, { status: 200 }); // Return the tags

  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 }); // Return error response
  }
}
