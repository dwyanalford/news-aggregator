// data/sportsData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const sportsData: NewsSource[] = [
  {
    name: 'ESPN - NBA',
    url: 'https://www.espn.com/espn/rss/nba/news',
    purpose: 'Latest news, scores, and updates from the NBA, powered by ESPN.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'ESPN - NHL',
    url: 'https://www.espn.com/espn/rss/nhl/news',
    purpose: 'Breaking news, highlights, and analysis from the NHL by ESPN.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'Sports Illustrated',
    url: 'http://www.si.com/rss/si_topstories.rss',
    purpose: 'Up-to-the-minute sports news, analysis, and insights from Sports Illustrated.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'Fox Sports',
    url: 'https://api.foxsports.com/v2/content/optimized-rss?partnerKey=MB0Wehpmuj2lUhuRhQaafhBjAJqaPU244mlTDK1i&size=30',
    purpose: 'Breaking sports news, scores, and updates from Fox Sports.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'Bleacher Report',
    url: 'https://bleacherreport.com/articles/feed',
    purpose: 'Breaking sports stories, analysis, and highlights from Bleacher Report.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'Yahoo Sports',
    url: 'https://sports.yahoo.com/rss/',
    purpose: 'Comprehensive sports coverage, analysis, and updates from Yahoo Sports.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'ESPN - NFL',
    url: 'https://www.espn.com/espn/rss/nfl/news',
    purpose: 'Latest NFL news, scores, and in-depth analysis from ESPN.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
  {
    name: 'Sporting News',
    url: 'https://www.sportingnews.com/us/rss',
    purpose: 'Breaking sports news, insights, and analysis from Sporting News.',
    logo: '/images/logos/sports-logo.png',
    logo2: '/images/logos/sports-news-title.png',
  },
];

export default sortByName(sportsData);
