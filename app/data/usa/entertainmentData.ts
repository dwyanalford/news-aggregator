// data/entertainmentData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const entertainmentData: NewsSource[] = [
  {
    name: 'E! Online',
    url: 'https://www.etonline.com/news/rss',
    purpose: 'The latest celebrity news, entertainment gossip, and exclusive Hollywood updates.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'TMZ',
    url: 'https://www.tmz.com/rss.xml',
    purpose: 'Breaking celebrity news, scandals, and the latest in entertainment.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'Pitchfork',
    url: 'https://pitchfork.com/rss/news/',
    purpose: 'Music news, album reviews, and the latest in indie and pop culture.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'Variety',
    url: 'https://variety.com/feed/',
    purpose: 'Entertainment business news, movie updates, and TV industry analysis.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'Rolling Stone',
    url: 'https://www.rollingstone.com/music/feed/',
    purpose: 'Music, film, and pop culture news from Rolling Stone.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'The Hollywood Reporter',
    url: 'https://www.hollywoodreporter.com/rss',
    purpose: 'Breaking news and insider coverage of the entertainment industry.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'Deadline',
    url: 'https://deadline.com/feed/',
    purpose: 'Breaking entertainment news, movie premieres, and Hollywood industry insights.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'UPROXX',
    url: 'https://uproxx.com/feed/',
    purpose: 'The latest in pop culture, music, and viral entertainment stories.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'Refinery29',
    url: 'https://www.refinery29.com/en-us/entertainment/rss.xml',
    purpose: 'Entertainment news, celebrity updates, and cultural stories with a modern twist.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
  {
    name: 'IndieWire',
    url: 'https://www.indiewire.com/feed/',
    purpose: 'Independent film, TV, and entertainment industry news and reviews.',
    logo: '/images/logos/entertainment-logo.png',
    logo2: '/images/logos/entertainment-news-title.png',
  },
];

export default sortByName(entertainmentData);
