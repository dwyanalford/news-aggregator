// app/utils/fetchNewsItems.ts

import axios from 'axios';
import xml2json from 'xml-js';
import { JSDOM } from 'jsdom';

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
    const dom = new JSDOM(html);
    return dom.window.document.body.textContent || '';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newsItems = await Promise.all(
    sources.map(async ({ name, url, purpose }) => {
      try {
        const response = await axios.get(url);

        const data = xml2json.xml2js(response.data, {
          compact: true,
          ignoreComment: true,
          alwaysChildren: true,
          sanitize: true,
        });

        let items: NewsItem[] = (
          name === 'Reddit' ? data.feed.entry :
          name === 'The Atlantic' ? data.feed.entry :
          name === 'The Ringer' ? data.feed.entry :
          name === 'SB Nation' ? data.feed.entry :
          data.rss.channel.item
        ).slice(0, 12).map((item: any) => {
          let title = item.title?._cdata || item.title?._text || (item.title?.__cdata || '');
          let pubDate = item.pubDate?._text || '';
          let link = item.link?._attributes?.href || item.link?._text || null;
          let description = (item.description?._cdata || item.description?._text || (item.description?.__cdata || '')).slice(0, 255);
          let author = item.author ? item.author._text : (item["dc:creator"]?._cdata || '');

          // Ensure the author is always a string
          author = typeof author === 'string' ? author : '';

          if (['The Huffington Post', 'USA Today', 'The Guardian Africa', 'The Guardian'].includes(name)) {
            description = removeHTMLTags(description); // remove HTML tags from result
          }

          if (['The Economist', 'Africa News'].includes(name)) {
            author = ''; // These RSS feeds don't provide an author field.
          }

          return { title, pubDate, link, description, author };
        });

        // Slice description at nearest period to the 255 character mark
        items = items.map(item => {
          const slicePoint = Math.min(255, item.description.length);
          const lastPeriodIdx = item.description.slice(0, slicePoint).lastIndexOf('.');
          if (lastPeriodIdx !== -1) {
            item.description = item.description.slice(0, lastPeriodIdx + 1);
          }
          return item;
        });

        // Filter items by date
        const itemsToday = items.filter(item => {
          const pubDate = new Date(item.pubDate);
          pubDate.setHours(0, 0, 0, 0);
          return pubDate.getTime() === today.getTime();
        });

        // If less than 3 items today, take the most recent 10 instead
        if (itemsToday.length <= 6) {
          items = items.slice(0, 12);
        } else {
          items = itemsToday;
        }

        return { source: name, purpose, items };
      } catch (error) {
        console.error(`Failed to fetch ${name} news: ${error}`);
        return { source: name, purpose, items: [] };
      }
    })
  );

  return newsItems;
}
