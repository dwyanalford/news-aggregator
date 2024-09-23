// app/api/tags/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions); // Fetch the user session

    if (!session || !session.user) {
      console.log('Unauthorized request. User session not found.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); 
    }

    const body = await req.text(); // Read raw body to catch malformed JSON
    const { name, articleId } = JSON.parse(body);  // Include articleId in the request

    console.log('Received request to create tag:', { name }); 
    console.log('User session:', session.user); 

    if (!name || !articleId) {
      console.log('Tag name or Article Id is missing in the request.');
      return NextResponse.json({ error: 'Tag name and articleId are required' }, { status: 400 });
    }

    // Check if a tag with the same name already exists
    console.log('Checking if tag already exists with name:', name); 
    const existingTag = await prisma.tag.findFirst({
      where: { name: toTitleCase(name) },  // Convert tag name to Title Case
    });

    let tag;
    if (existingTag) {
      console.log('Existing tag found:', existingTag);
      tag = existingTag;  // Use the existing tag
    } else {
      // Create a new tag if it doesn't exist
      console.log('No existing tag found, creating new tag with name:', name);
      const newTag = toTitleCase(name);  // Convert to title case
      tag = await prisma.tag.create({
        data: { name: newTag },
      });
    }

    // Check if the UserSavedArticle exists for the user and article
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: {
        articleId,
        userId: session.user.id,  // Ensure the article is associated with the correct user
      },
    });

    if (!userSavedArticle) {
      return NextResponse.json({ error: 'UserSavedArticle not found' }, { status: 404 });
    }

    // Step 2: Create or check for the UserSavedArticleTag association
    const existingAssociation = await prisma.userSavedArticleTag.findFirst({
      where: {
        userSavedArticleId: userSavedArticle.id,
        tagId: tag.id,
      },
    });

    if (!existingAssociation) {
      // Create a new association between the tag and the saved article for this user
      await prisma.userSavedArticleTag.create({
        data: {
          userSavedArticleId: userSavedArticle.id,
          tagId: tag.id,
          userId: session.user.id,  // Associate with the correct user
        },
      });
    }
    
    console.log('Tag successfully associated with the article:', tag); 
    return NextResponse.json(tag, { status: 201 });  // Return the tag that was created or found

  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: 'Failed to create tag', details: error.message }, { status: 500 });  // Return detailed error response
  }
}
