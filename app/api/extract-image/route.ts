// app/api/extract-image/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import axios from 'axios';

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
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const imageUrl = document.querySelector('meta[property="og:image"]')?.content
      || document.querySelector('meta[name="twitter:image"]')?.content
      || document.querySelector('article img')?.src
      || '';

    // Find the first <p> with at least 100 characters and no "subscribe" text
    const firstRelevantParagraph = Array.from(document.querySelectorAll('p'))
      .map(p => p.textContent?.trim())
      .find(text => text && text.length > 300);

    const firstParagraph = firstRelevantParagraph || 'No summary available';

    const result = { imageUrl, firstParagraph };
    cache.set(url, result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch or parse article at ${url}: ${error.message}`);
    return NextResponse.json({ error: 'Failed to extract image or content' }, { status: 500 });
  }
}
