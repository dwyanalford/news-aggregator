// data/healthData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const healthData: NewsSource[] = [
  {
    name: 'WebMD',
    url: 'https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC',
    purpose: 'Health news, tips, and resources for managing wellness and medical conditions.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'Medical News Today',
    url: 'https://www.medicalnewstoday.com/news/feed.rss',
    purpose: 'Latest health news and medical updates from Medical News Today.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'Mayo Clinic',
    url: 'https://newsnetwork.mayoclinic.org/feed/',
    purpose: 'Expert advice, health news, and updates from the Mayo Clinic.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'NPR',
    url: 'https://www.npr.org/rss/rss.php?id=1027',
    purpose: 'Health and science news, stories, and analysis from NPR.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'The Guardian',
    url: 'https://www.theguardian.com/society/health/rss',
    purpose: 'Global health news and analysis from The Guardian.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
    purpose: 'Comprehensive health news and updates from The New York Times.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'US News & World Report',
    url: 'https://health.usnews.com/rss/news',
    purpose: 'Health news, rankings, and insights from US News & World Report.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'ScienceDaily',
    url: 'https://www.sciencedaily.com/rss/health_medicine.xml',
    purpose: 'Breaking health and medicine news from ScienceDaily.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
  {
    name: 'Nutrition Facts',
    url: 'https://nutritionfacts.org/feed/?post_type=video',
    purpose: 'Science-based nutrition tips and videos from Nutrition Facts.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/health-news-title.png',
  },
];

export default sortByName(healthData);
