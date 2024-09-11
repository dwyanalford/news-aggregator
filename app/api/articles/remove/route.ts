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
    return NextResponse.json({ error: 'Article link not provided' }, { status: 400 });
  }

  try {
    // Find the article by its link
    const savedArticle = await prisma.savedArticle.findUnique({
      where: { link },
    });

    if (!savedArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check how many users have saved this article
    const userCount = await prisma.userSavedArticle.count({
      where: {
        articleId: savedArticle.id,  // Count users associated with the article ID
      },
    });

    if (userCount > 1) {
      // If more than one user has saved the article, remove only the association for the current user
      await prisma.userSavedArticle.deleteMany({
        where: {
          userId: userId,
          articleId: savedArticle.id,
        },
      });
      console.log("Removed user association with the article.");
    } else {
      // If only one user has saved it, delete all associations first, then delete the article
      await prisma.userSavedArticle.deleteMany({
        where: {
          articleId: savedArticle.id,
        },
      });

      // Now, delete the article from the database
      await prisma.savedArticle.delete({
        where: { id: savedArticle.id },
      });
      console.log("Article deleted from the database.");
    }

    return NextResponse.json({ message: 'Article removed successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Error removing article:", error);
    return NextResponse.json({ error: 'Failed to remove the article' }, { status: 500 });
  }
}
