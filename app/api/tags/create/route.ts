// app/api/tags/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import forbiddenWordsAndPhrases from '@/app/utils/profanityList';  // Import the list of profanity words

const prisma = new PrismaClient();

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to check for profanity in the tag
const containsProfanity = (tag: string): boolean => {
  const lowerCasedTag = tag.toLowerCase();
  return forbiddenWordsAndPhrases.some(profanity => lowerCasedTag.includes(profanity));
};

// Set the max length for tags
const MAX_TAG_LENGTH = 16;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions); // Fetch the user session

    if (!session || !session.user) {
      console.log('Unauthorized request. User session not found.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); 
    }

    const body = await req.text(); 
    const { name, articleId } = JSON.parse(body); 

    if (!name || !articleId) {
      return NextResponse.json({ error: 'Tag name and articleId are required' }, { status: 400 });
    }

     // Check if tag length exceeds the allowed limit
     if (name.length > MAX_TAG_LENGTH) {
      return NextResponse.json({ error: `Tag name must be less than ${MAX_TAG_LENGTH} characters.` }, { status: 400 });
    }

    // Check if the tag contains profanity
    if (containsProfanity(name)) {
      return NextResponse.json({ error: 'Tag name contains inappropriate content' }, { status: 400 });
    }

    // Your existing logic to create or find the tag
    const existingTag = await prisma.tag.findFirst({
      where: { name: toTitleCase(name) },
    });

    let tag;
    if (existingTag) {
      tag = existingTag;
    } else {
      const newTag = toTitleCase(name);
      tag = await prisma.tag.create({
        data: { name: newTag },
      });
    }

    // Your existing logic for associating the tag with the article
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: {
        articleId,
        userId: session.user.id, 
      },
    });

    if (!userSavedArticle) {
      return NextResponse.json({ error: 'UserSavedArticle not found' }, { status: 404 });
    }

    const existingAssociation = await prisma.userSavedArticleTag.findFirst({
      where: {
        userSavedArticleId: userSavedArticle.id,
        tagId: tag.id,
      },
    });

    if (!existingAssociation) {
      await prisma.userSavedArticleTag.create({
        data: {
          userSavedArticleId: userSavedArticle.id,
          tagId: tag.id,
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json(tag, { status: 201 }); 
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create tag', details: error.message }, { status: 500 });
  }
}
