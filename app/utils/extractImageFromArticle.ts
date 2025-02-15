// app/utils/extractImageFromArticle.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { logInfo, logError } from '@/app/utils/logger';

/**
 * Extracts the main image from an article page.
 * - Attempts to retrieve images from Open Graph (`og:image`), Twitter metadata, or the first article image.
 * - Uses Cheerio to parse the HTML and extract the best available image.
 *
 * @param articleUrl - The URL of the article to extract an image from.
 * @returns The extracted image URL or `null` if none is found.
 */
export async function extractImageFromArticle(articleUrl: string): Promise<string | null> {
  try {
    logInfo(`🔍 Fetching article for image extraction: ${articleUrl}`);

    if (!articleUrl) {
      logError("❌ No article URL provided.");
      return null;
    }

    // Fetch the HTML content of the article
    const { data: html } = await axios.get(articleUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000, // Set timeout to avoid hanging requests
    });

    // Load HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract the best available image from metadata or within the article
    const imageUrl =
      $('meta[property="og:image"]').attr('content') || // Open Graph image
      $('meta[name="twitter:image"]').attr('content') || // Twitter image
      $('article img').attr('src') || // First article image
      $('img').first().attr('src') || // Fallback: first image on page
      null;

    if (imageUrl) {
      logInfo(`✅ Image extracted: ${imageUrl}`);
      return imageUrl;
    } else {
      logError(`⚠️ No image found for: ${articleUrl}`);
      return null;
    }
  } catch (error) {
    logError(`❌ Failed to fetch or extract image from ${articleUrl}: ${(error as Error).message}`);
    return null;
  }
}