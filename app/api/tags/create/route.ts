// app/api/tags/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import if needed

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Return error if not authenticated
    }

    const body = await req.text(); // Read raw body to catch malformed JSON
    console.log('Received request body:', body); // Debugging log to see raw input

    let parsedBody;
    try {
      parsedBody = JSON.parse(body); // Manually parse JSON to catch errors
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        console.error('Failed to parse JSON body:', parseError.message); // Log JSON parsing errors
      } else {
        console.error('Unexpected error during JSON parsing:', parseError); // Log unexpected errors
      }
      return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 }); // Return 400 if JSON is invalid
    }

    const { name } = parsedBody; // Extract tag name from the parsed body

    console.log('Received request to create tag:', { name }); // Log the incoming request
    console.log('User session:', session.user); // Log the user session information

    if (!name) {
      console.log('Tag name is missing in the request.');
      return NextResponse.json({ error: 'Tag name is required' }, { status: 400 }); // Return error if no name provided
    }

    // Step 1: Check if a tag with the same name already exists
    console.log('Checking if tag already exists with name:', name); // Log before checking existing tag
    const existingTag = await prisma.tag.findFirst({
      where: { name },
    });

    if (existingTag) {
      console.log('Existing tag found:', existingTag); // Log the found existing tag
      return NextResponse.json(existingTag, { status: 200 }); // Return the existing tag
    }

    // Step 2: Create a new tag if it does not exist
    console.log('No existing tag found, creating new tag with name:', name); // Log before creating new tag
    const newTag = toTitleCase(name);  // Convert to title case
    const tag = await prisma.tag.create({
      data: {
        name: newTag,
      },
    });

    console.log('New tag created:', tag); // Log the newly created tag
    return NextResponse.json(tag, { status: 201 }); // Return the created tag

  } catch (error: any) {
    console.error("Unexpected Error:", error); // Log the complete error object
    return NextResponse.json({ error: 'Failed to create tag', details: error.message }, { status: 500 }); // Return detailed error response
  }
}
