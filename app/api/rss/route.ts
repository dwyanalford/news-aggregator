import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const publicationName = searchParams.get('publication'); // Fetch the publication name from the query
  
      if (!publicationName) {
        return NextResponse.json({ success: false, error: 'Publication name is required' }, { status: 400 });
      }
  
      // ✅ Fetch the RSS feed data based on the publication name
      const rssFeed = await prisma.rSSFeed.findFirst({
        where: { name: publicationName },
        select: {
          name: true,
          logo: true,
          purpose: true,
        },
      });
  
      if (!rssFeed) {
        return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
      }
  
      // ✅ Return the fetched RSS feed data
      return NextResponse.json({ success: true, data: rssFeed });
    } catch (error) {
      console.error('Error fetching RSS feed data:', error);
      return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
  }