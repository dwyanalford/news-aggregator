// app/utils/fetchNewsItems.ts

import axios from 'axios';
import xml2json from 'xml-js';
import * as cheerio from 'cheerio';  // Correct import for named exports
// import { JSDOM } from 'jsdom';

interface Source {
  name: string;
  url: string;
  purpose: string;
}

interface NewsItem {
  title: string;
  pubDate: string;
  link: string | null;
  description: string;
  author: string;
}

interface FetchedNewsItems {
  source: string;
  purpose: string;
  items: NewsItem[];
}

export async function fetchNewsItems(sources: Source[]): Promise<FetchedNewsItems[]> {
  function removeHTMLTags(html: string): string {
    const $ = cheerio.load(html);  // Load the HTML content using cheerio
    const textContent = $('body').text();  // Extract and return all text from the body
    return textContent.trim();  // Return the cleaned text content, removing any excess whitespace
  }
  

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newsItems = await Promise.all(
    sources.map(async ({ name, url, purpose }) => {
      try {
        const response = await axios.get(url);

        const data: any = xml2json.xml2js(response.data, {
          compact: true,
          ignoreComment: true,
          alwaysChildren: true,
          sanitize: true,
        });

        // Type check to ensure the correct structure
        const items: NewsItem[] = Array.isArray(data?.feed?.entry) // Atom Feed check
          ? data.feed.entry.map((item: any) => parseFeedItem(item, name, removeHTMLTags))
          : Array.isArray(data?.rss?.channel?.item) // RSS Feed check
          ? data.rss.channel.item.map((item: any) => parseFeedItem(item, name, removeHTMLTags))
          : []; // Default to empty if neither structure matches

        // Slice description at nearest period to the 255 character mark
        const updatedItems = items.map(item => {
          const slicePoint = Math.min(255, item.description.length);
          const lastPeriodIdx = item.description.slice(0, slicePoint).lastIndexOf('.');
          if (lastPeriodIdx !== -1) {
            item.description = item.description.slice(0, lastPeriodIdx + 1);
          }
          return item;
        });

        // Filter items by date
        const itemsToday = updatedItems.filter(item => {
          const pubDate = new Date(item.pubDate);
          pubDate.setHours(0, 0, 0, 0);
          return pubDate.getTime() === today.getTime();
        });

        // If less than 6 items today, take the most recent 12 instead
        const finalItems = itemsToday.length <= 6 ? updatedItems.slice(0, 12) : itemsToday;

        return { source: name, purpose, items: finalItems };
      } catch (error) {
        console.error(`Failed to fetch ${name} news: ${error}`);
        return { source: name, purpose, items: [] };
      }
    })
  );

  return newsItems;
}

// Helper function to parse a feed item
function parseFeedItem(item: any, sourceName: string, removeHTMLTags: (html: string) => string): NewsItem {
  let title = item.title?._cdata || item.title?._text || (item.title?.__cdata || '');
  let pubDate = item.pubDate?._text || '';
  let link = item.link?._attributes?.href || item.link?._text || null;
  let description = (item.description?._cdata || item.description?._text || (item.description?.__cdata || '')).slice(0, 255);
  let author = item.author ? item.author._text : (item["dc:creator"]?._cdata || '');

  // Ensure the author is always a string
  author = typeof author === 'string' ? author : '';

  if (['The Huffington Post', 'USA Today', 'The Guardian Africa', 'The Guardian'].includes(sourceName)) {
    description = removeHTMLTags(description); // Remove HTML tags from result
  }

  if (['The Economist', 'Africa News'].includes(sourceName)) {
    author = ''; // These RSS feeds don't provide an author field.
  }

  return { title, pubDate, link, description, author };
}
