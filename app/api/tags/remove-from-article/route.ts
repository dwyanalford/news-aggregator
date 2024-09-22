// app/api/tags/remove-from-article/route.ts

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

  try {
    const { articleId, tagId } = await req.json();

    console.log('Received articleId:', articleId);
    console.log('Received tagId:', tagId);

    if (!articleId || !tagId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Step 1: Find the UserSavedArticle by articleId
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: { articleId, userId: session.user.id },  // Make sure this is for the specific user
    });

    if (!userSavedArticle) {
      return NextResponse.json({ error: 'UserSavedArticle not found' }, { status: 404 });
    }

    const userSavedArticleId = userSavedArticle.id;

    // Step 2: Check how many associations exist for the given tagId
    const associationCount = await prisma.userSavedArticleTag.count({
      where: { tagId },
    });
    
    console.log('Number of Associations:', associationCount)

    if (associationCount > 1) {
      console.log('More than one association exists, deleting only the UserSavedArticleTag.');
      // Step 3: If more than one association exists, delete only the UserSavedArticleTag association
      await prisma.userSavedArticleTag.deleteMany({
        where: {
          userSavedArticleId: userSavedArticleId,
          tagId: tagId,
        },
      });

      console.log('Removed association between UserSavedArticle and Tag.');
      
    } else if (associationCount === 1) {
      // Step 3: Only one association exists, delete the UserSavedArticleTag association and the Tag itself
      console.log('Only one association exists, deleting the association and tag.');
      await prisma.userSavedArticleTag.deleteMany({
        where: {
          userSavedArticleId: userSavedArticleId,
          tagId: tagId,
        },
      });

      await prisma.tag.delete({
        where: { id: tagId },
      });

      console.log('Removed association and deleted the Tag.');
    }

    return NextResponse.json({ message: 'Tag and/or association removed successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Error removing tag:", error);
    return NextResponse.json({ error: 'Failed to remove tag' }, { status: 500 });
  }
}
