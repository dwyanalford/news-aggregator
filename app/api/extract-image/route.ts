// app/api/extract-image/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const cache = new Map(); // Simple in-memory cache

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  if (cache.has(url)) {
    return NextResponse.json(cache.get(url), { status: 200 });
  }

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);  // Load HTML using cheerio

    // Extract the image URL
    const imageUrl =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('article img').attr('src') ||
      '';

    // Find the first <p> with at least 300 characters and no "subscribe" text
    const firstRelevantParagraph = $('p')
      .map((_, el) => $(el).text().trim())
      .toArray()
      .find(text => text.length > 300) || 'No summary available';

    const result = { imageUrl, firstParagraph: firstRelevantParagraph };
    cache.set(url, result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Narrow the type of error to access the message property safely
    if (error instanceof Error) {
      console.error(`Failed to fetch or parse article at ${url}: ${error.message}`);
      return NextResponse.json({ error: 'Failed to extract image or content' }, { status: 500 });
    } else {
      console.error(`Unknown error occurred: ${String(error)}`);
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
     }
  }
}
