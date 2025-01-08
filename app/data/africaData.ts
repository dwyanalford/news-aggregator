// data/africaData.ts

import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string; // Adding the new key to the interface
}

const africaData: NewsSource[] = [
  {
    name: 'News24',
    url: 'https://feeds.capi24.com/v1/Search/articles/news24/Africa/rss',
    purpose: 'Breaking news, opinions, and in-depth coverage of African events, based in South Africa.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'The Africa Report',
    url: 'https://www.theafricareport.com/feed/',
    purpose: 'Breaking news, analysis, and commentary on African politics and economy.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'The Guardian Africa',
    url: 'https://www.theguardian.com/world/africa/rss',
    purpose: 'News, analysis, and commentary focused on Africa, published by The Guardian (UK).',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Punch',
    url: 'https://rss.punchng.com/v1/category/latest_news',
    purpose: 'Breaking news, entertainment, and political coverage from Nigeria.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Mail & Guardian',
    url: 'https://mg.co.za/africa/feed/',
    purpose: 'Independent news, analysis, and opinion pieces from South Africa and Africa.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'France 24',
    url: 'https://www.france24.com/en/afrique/rss',
    purpose: 'International news focused on Africa and global events, published in France.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'AllAfrica',
    url: 'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf',
    purpose: 'Comprehensive African news and reports covering politics, business, and culture.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Africa Newsroom',
    url: 'https://www.africa-newsroom.com/africarc/rss/',
    purpose: 'Press releases and news articles from across Africa.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'BBC News Africa',
    url: 'http://feeds.bbci.co.uk/news/world/africa/rss.xml',
    purpose: 'Breaking news, features, and in-depth analysis about Africa from the BBC.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Herald',
    url: 'https://www.herald.co.zw/feed/',
    purpose: 'Zimbabwean news covering politics, sports, and culture.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'IPS News',
    url: 'http://www.ipsnews.net/feed/',
    purpose: 'News and analysis focused on global development and social issues.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'African Arguments',
    url: 'https://africanarguments.org/feed/',
    purpose: 'Debating ideas, shaping policy, and informing change across Africa.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'East African',
    url: 'https://www.theeastafrican.co.ke/rss.xml',
    purpose: 'News and analysis focused on East Africa’s politics and economy.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Independent',
    url: 'https://www.independent.co.ug/feed/',
    purpose: 'Uganda-focused news, business, and analysis.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Addis Standard',
    url: 'https://addisstandard.com/feed/',
    purpose: 'Ethiopian news covering politics, society, and economy.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'New Times',
    url: 'https://www.newtimes.co.rw/rssFeed/14',
    purpose: 'Latest news and opinions from Rwanda.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Joy Online',
    url: 'https://www.myjoyonline.com/feed/',
    purpose: 'News, entertainment, and business coverage from Ghana.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Namibian',
    url: 'https://www.namibian.com.na/feed/',
    purpose: 'News focused on politics, economy, and society in Namibia.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  },
  {
    name: 'Premium',
    url: 'https://www.premiumtimesng.com/feed/',
    purpose: 'Investigative journalism and breaking news from Nigeria.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/africa-news-title.png',
  }
];

export default sortByName(africaData);
