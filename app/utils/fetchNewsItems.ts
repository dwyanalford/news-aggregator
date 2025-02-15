// app/utils/fetchNewsItems.ts

import axios from 'axios';
import xml2json from 'xml-js';
import * as cheerio from 'cheerio';
import { DEFAULT_FILTER } from "@/app/config/defaults";

/**
 * Interface Definitions
 *
 * These interfaces define the structure of the RSS sources and the news items.
 * - `Source`: Represents an RSS feed source with name, URL, purpose, and region.
 * - `NewsItem`: Represents an article fetched from the RSS feed.
 * - `FetchedNewsItems`: Represents a processed response containing news articles.
 *
 * Update these interfaces if new fields need to be stored or new sources are added.
 */

interface Source {
  name: string;
  url: string;
  purpose: string;
  region: string;
}

interface NewsItem {
  title: string;
  pubDate: string;
  link: string | null;
  description: string;
  imageURL?: string;
  author?: string;
  source: string;
  category?: string;
  region?: string;
}

interface FetchedNewsItems {
  source: string;
  purpose: string;
  items: NewsItem[];
  region: string;
  filteredCount: number;
  failed: boolean;
  url: string; // ✅ Ensure URL is included
  errorMessage?: string; // ✅ Ensure naming consistency
}



/**
 * Fetch News Items Function
 *
 * This function fetches news articles from a list of RSS sources.
 * - It sends HTTP requests to the RSS feed URLs.
 * - Parses the XML response and extracts relevant article data.
 * - Filters articles based on the specified date range (`today`, `pastWeek`, `pastTwoWeeks`).
 * - Returns an array of `FetchedNewsItems` containing parsed articles.
 */
export async function fetchNewsItems(
  sources: Source[],
  filterType: 'today' | 'pastWeek' | 'pastTwoWeeks' = DEFAULT_FILTER
): Promise<FetchedNewsItems[]> {

  /**
   * Removes HTML tags from article descriptions.
   * This ensures that the extracted content is clean and readable.
   */
  function removeHTMLTags(html: string): string {
    const $ = cheerio.load(html);
    const textContent = $('body').text();
    return textContent.trim();
  }

  async function fetchArticleImage(articleUrl: string): Promise<string | null> {
    try {
      const response = await axios.get(articleUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const $ = cheerio.load(response.data);
      const firstImage = $('img').first().attr('src');

      return firstImage || null;
    } catch (error) {
      console.error(`❌ Failed to fetch image from ${articleUrl}:`, (error as Error).message);
      return null;
    }
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log(`🚀 Fetching news articles with filter: ${filterType}`);

  const newsItems = await Promise.all(

    sources.map(async ({ name, url, purpose, region }) => {
      let finalItems: NewsItem[] = []; // Ensures `finalItems` exists in all scenarios

      try {
        // console.log(`🌐 Fetching news from: ${name} (${url})`);

        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Accept': 'application/xml, text/xml',
            'Referer': 'https://www.google.com/',
          }
        });

        // Validate that the response is an XML document
        if (!response.data.trim().startsWith('<?xml')) {
          console.warn(`⚠️ Skipping ${name}: Response is not XML (possibly blocked by Cloudflare)`);
        
          return { 
            source: name, 
            purpose, 
            region, 
            items: [], 
            filteredCount: 0, 
            failed: true, 
            url, 
        };
        
        }
        

        // console.log(`✅ Successfully fetched data from ${name}, parsing XML...`);

        const data: any = xml2json.xml2js(response.data, {
          compact: true,
          ignoreComment: true,
          alwaysChildren: true,
          sanitize: true,
        });

        /**
         * Parses the XML structure based on RSS or Atom feed format.
         * - If it's an Atom feed, entries are stored in `feed.entry`.
         * - If it's an RSS feed, articles are found in `rss.channel.item`.
         * - Returns an empty array if neither format is detected.
         */
        const items: NewsItem[] = Array.isArray(data?.feed?.entry)
          ? data.feed.entry.map((item: any) => parseFeedItem(item, name, removeHTMLTags, region))
          : Array.isArray(data?.rss?.channel?.item)
          ? data.rss.channel.item.map((item: any) => parseFeedItem(item, name, removeHTMLTags, region))
          : [];

        // console.log(`📄 Parsed ${items.length} articles from ${name}`);

        // Ensures descriptions are properly truncated at the nearest period within 255 characters.
        const updatedItems = await Promise.all(
          items.map(async (item) => {
            // ✅ Truncate description at the nearest period within 255 characters
            const slicePoint = Math.min(255, item.description.length);
            const lastPeriodIdx = item.description.slice(0, slicePoint).lastIndexOf('.');
            if (lastPeriodIdx !== -1) {
              item.description = item.description.slice(0, lastPeriodIdx + 1);
            }
        
            // ✅ Fetch article image if missing
            if (!item.imageURL) {
              const image = await fetchArticleImage(item.link || '');
              item.imageURL = image || undefined; // ✅ Ensures `undefined` instead of `null`
            }
        
            return item;
          })
        );
    
        // console.log(`✂️ Trimmed descriptions for ${updatedItems.length} articles from ${name}`);

        // Filter articles based on date range
        if (filterType === 'today') {
          finalItems = updatedItems.filter(item => {
            const pubDate = new Date(item.pubDate);
            pubDate.setHours(0, 0, 0, 0);
            return pubDate.getTime() === today.getTime();
          });
        } else if (filterType === 'pastWeek') {
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 6);
          finalItems = updatedItems.filter(item => {
            const pubDate = new Date(item.pubDate);
            pubDate.setHours(0, 0, 0, 0);
            return pubDate >= oneWeekAgo && pubDate <= today;
          });
        } else {
          const twoWeeksAgo = new Date(today);
          twoWeeksAgo.setDate(today.getDate() - 13);
          finalItems = updatedItems.filter(item => {
            const pubDate = new Date(item.pubDate);
            pubDate.setHours(0, 0, 0, 0);
            return pubDate >= twoWeeksAgo && pubDate <= today;
          });
        }

        // console.log(`📅 Filtered ${finalItems.length} articles for ${filterType} from ${name}`);

        return { source: name, purpose, region, items: finalItems, filteredCount: finalItems.length, failed: false, url: url ?? ""};


      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"; // ✅ Capture error message

        return { 
          source: name, 
          purpose, 
          region, 
          items: [], 
          filteredCount: 0, 
          failed: true, 
          url, 
          errorMessage // ✅ Corrected variable name
        };
      }
    })
  );

  console.log(`🎉 Completed fetching news from ${sources.length} sources`);

  return newsItems;
}

/**
 * Parses an individual RSS feed item.
 * - Extracts title, publication date, link, description, and author.
 * - Cleans and limits the description to 255 characters.
 * - Returns a `NewsItem` object with all extracted fields.
 */
function parseFeedItem(
  item: any,
  sourceName: string,
  removeHTMLTags: (html: string) => string,
  region: string
): NewsItem {
  let title = item.title?._cdata || item.title?._text || '';
  let pubDate = item.pubDate?._text || '';
  let link = item.link?._attributes?.href || item.link?._text || null;
  let description = removeHTMLTags(
    item.description?._cdata || item.description?._text || ''
  ).slice(0, 255);
  let author = item.author?._text || (item["dc:creator"]?._cdata || '');
  // ✅ Extract image from multiple RSS fields
  let imageURL =
  item.image?._text ||  
  item["media:content"]?._attributes?.url ||  
  item["enclosure"]?._attributes?.url ||  
  item["media:thumbnail"]?._attributes?.url ||  
  null;


  return {
    title,
    pubDate,
    link,
    description,
    imageURL,
    author,
    source: sourceName,
    category: undefined,
    region,
  };
}