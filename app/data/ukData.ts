// data/ukData.ts

import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string; // Adding the new key to the interface
}

const ukData: NewsSource[] = [
  {
    name: 'BBC News',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    purpose: 'Trusted World and UK news, including local and regional perspectives.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'The Guardian',
    url: 'https://www.theguardian.com/uk/rss',
    purpose: 'Latest news, sport, business, comment, analysis, and reviews from a leading liberal voice.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'The Telegraph',
    url: 'https://www.telegraph.co.uk/rss.xml',
    purpose: 'News, business, sport, comment, lifestyle, and culture coverage from The Telegraph.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'The Independent',
    url: 'https://www.independent.co.uk/rss',
    purpose: 'Breaking news and top stories from The Independent.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'Daily Mail',
    url: 'https://www.dailymail.co.uk/articles.rss',
    purpose: 'Breaking news, celebrity photos, viral videos, and science & tech updates from MailOnline.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'Financial Times',
    url: 'https://www.ft.com/?format=rss',
    purpose: 'UK and international business, finance, economic, and political news and analysis.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'The Irish Times',
    url: 'https://www.irishtimes.com/cmlink/news-1.1319192',
    purpose: 'Breaking news, Irish and international headlines from The Irish Times.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  },
  {
    name: 'The Sun',
    url: 'https://www.thesun.co.uk/feed/',
    purpose: 'News, exclusives, sport, celebrities, politics, business, and lifestyle coverage from The Sun.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/uk-news-title.png',
  }
];

export default sortByName(ukData);
