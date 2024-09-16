// app/utils/extractDescription.ts

import { load } from 'cheerio';

export function extractSummaryFromDescription(description: string): string {
  if (!description) return 'No summary available';

  // Load the HTML content using Cheerio
  const $ = load(description, null, false);  // Ensure Cheerio loads the HTML as-is without parsing it

  // Remove any <img>, <figure>, or other non-textual elements
  $('img, figure, script, style').remove();

  // Extract and concatenate all the <p> tags text
  const paragraphs = $('p').map((_, el) => $(el).text().trim()).get();

  // Join the paragraphs and return as a single string
  return paragraphs.length > 0 ? paragraphs.join(' ') : 'No summary available';
}
