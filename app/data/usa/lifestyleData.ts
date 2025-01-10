// data/lifestyleData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const lifestyleData: NewsSource[] = [
  {
    name: 'Refinery29',
    url: 'https://www.refinery29.com/en-us/rss.xml',
    purpose: 'A modern take on lifestyle, fashion, beauty, and wellness news.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'SELF',
    url: 'https://www.self.com/feed',
    purpose: 'Workouts, health and wellness advice, beauty tips, and style guides.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'Well+Good',
    url: 'https://www.wellandgood.com/feed/',
    purpose: 'Expert tips and trends in wellness, fitness, and self-care.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'BuzzFeed',
    url: 'https://www.buzzfeed.com/life.xml',
    purpose: 'Lifestyle stories, food recipes, and trending life hacks from BuzzFeed.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'Food52',
    url: 'https://food52.com/blog.rss',
    purpose: 'Food, cooking tips, and recipes to inspire your culinary journey.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'Bon Appétit',
    url: 'https://www.bonappetit.com/feed/rss',
    purpose: 'Gourmet recipes, cooking advice, and food culture from Bon Appétit.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'Lifehacker',
    url: 'https://lifehacker.com/rss',
    purpose: 'Tips, tricks, and life hacks to make your life more efficient.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'The Everygirl',
    url: 'https://theeverygirl.com/feed/',
    purpose: 'Lifestyle advice, career tips, and inspiration for modern women.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
  {
    name: 'A Cup of Jo',
    url: 'https://cupofjo.com/feed/',
    purpose: 'Style, culture, motherhood, travel, food, and life stories.',
    logo: '/images/logos/lifestyle-logo.png',
    logo2: '/images/logos/lifestyle-news-title.png',
  },
];

export default sortByName(lifestyleData);
