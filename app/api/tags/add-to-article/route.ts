// app/api/tags/add-to-article/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions); // Fetch the user session

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId, tagId } = await req.json(); // Extract data from request body

  if (!articleId || !tagId) {
    return NextResponse.json({ error: 'Article ID and Tag ID are required' }, { status: 400 });
  }

  try {
    console.log('Received request to associate tag with saved article:', { articleId, tagId });

    // Find the UserSavedArticle using articleId and userId
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: {
        articleId: articleId,
        userId: session.user.id,  // Ensure this is specific to the logged-in user
      },
    });

    if (!userSavedArticle) {
      console.error('UserSavedArticle not found for the given articleId and userId.');
      return NextResponse.json({ error: 'UserSavedArticle not found' }, { status: 404 });
    }

    console.log('Found UserSavedArticle ID:', userSavedArticle.id);

    // Create association between UserSavedArticle and Tag
    const userSavedArticleTag = await prisma.userSavedArticleTag.create({
      data: {
        userSavedArticleId: userSavedArticle.id,
        tagId: tagId,
        userId: session.user.id, // Include userId in the association
      },
    });

    console.log('Created UserSavedArticleTag association:', userSavedArticleTag);

    return NextResponse.json(userSavedArticleTag, { status: 201 });
  } catch (error) {
    console.error('Error associating tag with saved article:', error);
    return NextResponse.json({ error: 'Failed to associate tag' }, { status: 500 });
  }
}
