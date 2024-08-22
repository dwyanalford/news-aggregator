// app/api/news-items/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsItems } from '@/app/utils/fetchNewsItems';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  
  if (!source) {
    return NextResponse.json({ message: 'Source not provided' }, { status: 400 });
  }

  const sourceObj = { name: 'Selected Source', url: source, purpose: '' };

  try {
    const newsItems = await fetchNewsItems([sourceObj]);
    return NextResponse.json(newsItems[0].items);
  } catch (error) {
    console.error('Error fetching news items:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
