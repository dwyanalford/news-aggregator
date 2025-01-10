// data/businessData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const businessData: NewsSource[] = [
  {
    name: 'Entrepreneur',
    url: 'https://www.entrepreneur.com/latest.rss',
    purpose: 'Latest news, tips, and insights for entrepreneurs and business owners.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'Techcrunch',
    url: 'https://techcrunch.com/feed',
    purpose: 'Breaking news, analysis, and insights on technology startups and trends.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'NYT Business',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    purpose: 'Business news, analysis, and market trends from The New York Times.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'Fortune',
    url: 'https://fortune.com/feed/',
    purpose: 'Insights on business, finance, technology, and industry trends.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'CNBC',
    url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    purpose: 'Breaking business news and financial market coverage from CNBC.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'Financial Times',
    url: 'https://www.ft.com/?format=rss',
    purpose: 'Global news, business, finance, and economic updates from the Financial Times.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'The Economist',
    url: 'https://www.economist.com/latest/rss.xml',
    purpose: 'Global news, analysis, and commentary on business and economics.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'MarketWatch',
    url: 'https://www.marketwatch.com/rss/topstories',
    purpose: 'Breaking news, market data, and investment advice from MarketWatch.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
  {
    name: 'Seeking Alpha',
    url: 'https://seekingalpha.com/feed.xml',
    purpose: 'Investment insights, stock market news, and financial analysis.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/business-news-title.png',
  },
];

export default sortByName(businessData);
