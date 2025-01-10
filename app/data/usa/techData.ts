// data/techData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const techData: NewsSource[] = [
  {
    name: 'Ars Technica',
    url: 'https://arstechnica.com/feed/',
    purpose: 'In-depth coverage of the latest developments in technology, science, and culture.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'BuzzFeed',
    url: 'https://www.buzzfeed.com/index.xml',
    purpose: 'The latest in tech, entertainment, and viral news, curated just for you.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'CNN',
    url: 'http://rss.cnn.com/rss/cnn_tech.rss',
    purpose: 'Stay up-to-date on the latest tech news from Silicon Valley and beyond.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'CNET',
    url: 'https://www.cnet.com/rss/news/',
    purpose: 'Reviews, news, and analysis on the gadgets and tech that shape our lives.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/rss',
    purpose: 'Breaking news, insider info, and deep-dive analysis of the tech industry.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/feed/tag/tech',
    purpose: 'Insightful essays and analysis on the impact of technology on our lives.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    purpose: 'The latest technology news from award-winning journalists at The New York Times.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/r/technology/.rss',
    purpose: 'A lively community of tech enthusiasts sharing news, insights, and analysis.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    purpose: 'Breaking news and exclusive stories on the latest technology and startup trends.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    purpose: 'The latest in technology, science, and culture, all in one place.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
  {
    name: 'ZDNet',
    url: 'https://www.zdnet.com/news/rss.xml',
    purpose: 'Cutting-edge news, analysis, and commentary on technology shaping the world.',
    logo: '/images/logos/tech-logo.png',
    logo2: '/images/logos/tech-news-title.png',
  },
];

export default sortByName(techData);
