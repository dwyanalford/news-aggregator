// app/api/articles/save/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import if needed

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions); // Fetch the user session

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Return error if not authenticated
  }

  const userId = session.user.id; // Get the user's ID from the session
  const { title, date, link, summary, imageURL } = await req.json(); // Extract article data from the request, defaulting description to an empty string if undefined

  console.log('Received data:', { title, date, link, summary, imageURL }); // Log received data

  if (!title || !date || !link || !summary) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 }); // Validate required fields
  }

  try {
    // Check if the article already exists in the SavedArticle collection
    let savedArticle = await prisma.savedArticle.findUnique({
      where: { link },
    });

    if (!savedArticle) {
      // If the article doesn't exist, create it in the SavedArticle collection
      savedArticle = await prisma.savedArticle.create({
        data: {
          title: title as string, // Ensure title is a string
          date: new Date(date), // Ensure date is a Date object
          link: link as string, // Ensure link is a string
          summary: summary,
          imageURL: imageURL ? (imageURL as string) : null, // Ensure optional fields are correctly handled
        },
      });
    }

    // Check if the user is already associated with this article in UserSavedArticle
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: {
        userId: userId,
        articleId: savedArticle.id,
      },
    });

    if (!userSavedArticle) {
      // If the user hasn't saved this article, create an entry in UserSavedArticle
      await prisma.userSavedArticle.create({
        data: {
          userId: userId,
          articleId: savedArticle.id,
        },
      });
      console.log("Article associated with the user.");
    } else {
      console.log("Article is already saved for this user.");
    }

    return NextResponse.json(savedArticle, { status: 200 }); // Return the saved article

  } catch (error) {
    console.error("Error saving article:", error); // Log the error for debugging
    return NextResponse.json({ error: 'Failed to save the article' }, { status: 500 }); // Return error response
  }
}
