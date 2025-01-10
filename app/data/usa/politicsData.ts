// data/politicsData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const politicsData: NewsSource[] = [
  {
    name: 'Politico',
    url: 'https://rss.politico.com/politics-news.xml',
    purpose: 'Covers the latest news, analysis, and opinion on US politics and policy.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'The Hill',
    url: 'https://thehill.com/news/feed/',
    purpose: 'Up-to-the-minute news and analysis on US politics in Washington, D.C.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'NPR',
    url: 'https://www.npr.org/rss/rss.php?id=1014',
    purpose: 'Political news, analysis, and in-depth reporting from NPR.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'Washington Post',
    url: 'https://www.washingtonpost.com/politics/?outputType=rss',
    purpose: 'Breaking political news and analysis from Washington, D.C., and beyond.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'Fox',
    url: 'https://feeds.foxnews.com/foxnews/politics',
    purpose: 'Breaking news and commentary on US politics from Fox News.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    purpose: 'Comprehensive political news and analysis from The New York Times.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'USA Today',
    url: 'https://rssfeeds.usatoday.com/usatoday-NewsTopStories&x=1',
    purpose: 'Breaking political news, features, and opinions from USA Today.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'ABC',
    url: 'https://abcnews.go.com/abcnews/politicsheadlines',
    purpose: 'Breaking political news, commentary, and headlines from ABC News.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'The Economist',
    url: 'https://www.economist.com/united-states/rss.xml',
    purpose: 'Analysis and commentary on US and global politics from The Economist.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'The Huffington Post',
    url: 'https://www.huffpost.com/section/politics/feed',
    purpose: 'Political news, analysis, and opinion from The Huffington Post.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
  {
    name: 'Wall Street Journal',
    url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    purpose: 'In-depth coverage of global and US politics from The Wall Street Journal.',
    logo: '/images/logos/politics-logo.png',
    logo2: '/images/logos/politics-news-title.png',
  },
];

export default sortByName(politicsData);
