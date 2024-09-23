// app/api/articles/filter-by-tag/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const tagName = searchParams.get('tagName');  // Fetch tagName from the query params

    // Make sure the user is logged in
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if tagName is provided
    if (!tagName) {
        return NextResponse.json({ error: 'tagName is required' }, { status: 400 });
    }

    try {
        // Step 1: Fetch the tag by name
        const tag = await prisma.tag.findUnique({
            where: { name: tagName },
        });
        console.log('Fetched Tag:', tag); 
        

        if (!tag) {
            return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
        }

        // Step 2: Fetch articles associated with the found tagId
        const articles = await prisma.userSavedArticle.findMany({
            where: {
                userId: session.user.id,
                userSavedArticleTags: {
                    some: {
                        tagId: tag.id,  // Use the fetched tag's id
                    },
                },
            },
            include: {
                savedArticle: true,
                userSavedArticleTags: {
                    include: { tag: true },
                },
            },
        });

        // Step 3: Format the articles to include tags
        const formattedArticles = articles.map((article) => ({
            id: article.savedArticle.id,
            title: article.savedArticle.title,
            date: article.savedArticle.date,
            link: article.savedArticle.link,
            summary: article.savedArticle.summary,
            imageURL: article.savedArticle.imageURL,
            tags: article.userSavedArticleTags.map((tag) => tag.tag.name),  // Include tag names
        }));

        return NextResponse.json(formattedArticles, { status: 200 });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}
