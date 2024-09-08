// app/api/articles/save/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// Named export for handling the POST request
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log("Session object:", session);  // Check the session object output

  if (!session || !session.user) {
    console.log("User is not authenticated.");
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const { title, date, link, summary, imageURL } = await req.json();

  if (!title || !date || !link || !summary) {
    console.log("Missing required fields:", { title, date, link, summary });
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    let savedArticle = await prisma.savedArticle.findUnique({
      where: { link },
    });

    if (!savedArticle) {
      // Create a new article entry if it doesn't exist
      savedArticle = await prisma.savedArticle.create({
        data: {
          title,
          date: new Date(date),
          link,
          summary,
          imageURL,
          user: { connect: { id: userId } },
        },
      });
      console.log("Article saved:", savedArticle);
    } else {
      const userArticle = await prisma.savedArticle.findFirst({
        where: {
          link,
          userId: userId,
        },
      });

      if (!userArticle) {
        await prisma.savedArticle.update({
          where: { id: savedArticle.id },
          data: {
            user: { connect: { id: userId } },
          },
        });
        console.log("Article associated with the user.");
      } else {
        console.log("Article is already saved for this user.");
      }
    }

    return NextResponse.json(savedArticle, { status: 200 });
  } catch (error) {
    console.error("Error saving article:", error);
    return NextResponse.json({ error: 'Failed to save the article' }, { status: 500 });
  }
}
