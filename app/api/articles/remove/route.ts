// app/api/articles/remove/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { link } = await req.json();  // Get article link from request body

  if (!link) {
    console.log('Error: No article link provided');
    return NextResponse.json({ error: 'Article link not provided' }, { status: 400 });
  }

  try {
    // Find the article by its link
    const savedArticle = await prisma.savedArticle.findUnique({
      where: { link },
    });

    if (!savedArticle) {
      console.log('Error: Article not found');
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check how many users have saved this article
    const userCount = await prisma.userSavedArticle.count({
      where: {
        articleId: savedArticle.id,  // Count users associated with the article ID
      },
    });

    if (userCount > 1) {
      // If more than one user has saved the article, only remove the association for the current user
      await prisma.userSavedArticleTag.deleteMany({
        where: {
          userSavedArticle: {
            articleId: savedArticle.id,
            userId: userId,
          },
        },
      });
      console.log("Removed tag associations for user ID:", userId, " and article ID:", savedArticle.id);
      
      // Now remove the user-article association
      await prisma.userSavedArticle.deleteMany({
        where: {
          userId: userId,
          articleId: savedArticle.id,
        },
      });
      console.log("Removed user association with the article for user ID:", userId);
    } else {
      // If only one user has saved it, delete all associations, then delete the article
      await prisma.userSavedArticleTag.deleteMany({
        where: {
          userSavedArticle: {
            articleId: savedArticle.id,
          },
        },
      });
      console.log("Removed all tag associations for article ID:", savedArticle.id);

      await prisma.userSavedArticle.deleteMany({
        where: {
          articleId: savedArticle.id,
        },
      });
      console.log("Removed all user-article associations for article ID:", savedArticle.id);

      // Now, delete the article from the database
      await prisma.savedArticle.delete({
        where: { id: savedArticle.id },
      });
      console.log("Deleted the article from the database. Article ID:", savedArticle.id);
    }

    // Ensure to also remove the tag association from the user if no more articles are associated with the tag
    const tagsForUser = await prisma.userSavedArticleTag.groupBy({
      by: ['tagId'],
      where: { userId },
      _count: { _all: true },
    });

    for (const tag of tagsForUser) {
      if (tag._count._all === 0) {
        await prisma.tag.delete({
          where: { id: tag.tagId },
        });
        console.log(`Removed tag ID ${tag.tagId} since it is no longer used by the user.`);
      }
    }

    // Return success response
    return NextResponse.json({ message: 'Article and associated tags removed successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Error removing article:", error);
    return NextResponse.json({ error: 'Failed to remove the article' }, { status: 500 });
  }
}
