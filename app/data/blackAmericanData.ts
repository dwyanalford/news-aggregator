import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  categories: string[];
  logo: string;
  logo2: string; // Adding the new key to the interface
}

const blackAmericanData: NewsSource[] = [
  {
    name: 'The Root',
    url: 'https://www.theroot.com/rss',
    purpose: 'Black News and Black Views with a Whole Lotta Attitude',
    categories: ['Politics'],
    logo: '/images/logos/the-root.png',
    logo2: '/images/logos/the-root-2.png' // New logo2 key
  },
  {
    name: 'Atlantic Black Star',
    url: 'https://atlantablackstar.com/feed/',
    purpose: 'News, entertainment, and more',
    categories: ['Politics', 'Entertainment'],
    logo: '/images/logos/atlantic-black-star.png',
    logo2: '/images/logos/atlantic-black-star-2.png'
  },
  {
    name: 'Black America Web',
    url: 'https://blackamericaweb.com/feed/',
    purpose: 'Latest Black American News',
    categories: ['Politics'],
    logo: '/images/logos/black-america-web.png',
    logo2: '/images/logos/black-america-web-2.png'
  },
  {
    name: 'Ebony',
    url: 'https://www.ebony.com/feed/',
    purpose: 'Culture, news, and lifestyle from an African American perspective',
    categories: ['Culture'],
    logo: '/images/logos/ebony.png',
    logo2: '/images/logos/ebony-2.png'
  },
  {
    name: 'The Grio',
    url: 'https://thegrio.com/feed/',
    purpose: 'Focuses on breaking news, opinion, politics, and more',
    categories: ['Politics'],
    logo: '/images/logos/grio.png',
    logo2: '/images/logos/grio-2.png'
  },
  {
    name: 'MadameNoire',
    url: 'https://madamenoire.com/feed/',
    purpose: 'Focused primarily on Black womens lifestyle, health, and current events',
    categories: ['Culture', 'Black Women'],
    logo: '/images/logos/madame-noire.png',
    logo2: '/images/logos/madame-noire-2.png'
  },
  {
    name: 'News One',
    url: 'https://newsone.com/feed/',
    purpose: 'National news tailored to an African American audience',
    categories: ['Politics'],
    logo: '/images/logos/news-one.png',
    logo2: '/images/logos/news-one-2.png'
  },
  {
    name: 'Our weekly',
    url: 'https://www.ourweekly.com/rss/',
    purpose: 'African American news and entertainment source (Los Angeles)',
    categories: ['Entertainment'],
    logo: '/images/logos/our-weekly.png',
    logo2: '/images/logos/our-weekly-2.png'
  },
  {
    name: 'Rolling Out',
    url: 'https://rollingout.com/feed/',
    purpose: 'Focused on African American culture, politics, and entertainment.',
    categories: ['Culture', 'Politics', 'Entertainment'],
    logo: '/images/logos/rolling-out.png',
    logo2: '/images/logos/rolling-out-2.png'
  },
  {
    name: 'Source',
    url: 'https://thesource.com/feed/',
    purpose: 'Focuses on music and entertainment, but also covers social and political issues.',
    categories: ['Entertainment', 'Culture'],
    logo: '/images/logos/source.png',
    logo2: '/images/logos/source-2.png'
  },
  {
    name: 'Vibe',
    url: 'https://www.vibe.com/feed/',
    purpose: 'Music, celebrities, and current events.',
    categories: ['Entertainment'],
    logo: '/images/logos/vibe.png',
    logo2: '/images/logos/vibe-2.png'
  },
  {
    name: 'XXL',
    url: 'https://www.xxlmag.com/feed/',
    purpose: 'Primarily focused on hip-hop but includes social issues as well.',
    categories: ['Entertainment'],
    logo: '/images/logos/xxl.png',
    logo2: '/images/logos/xxl-2.png'
  },
  {
    name: 'News Afro',
    url: 'https://afro.com/feed/',
    purpose: 'Black Media Authority',
    categories: ['Politics'],
    logo: '/images/logos/afro-news.png',
    logo2: '/images/logos/afro-news-2.png'
  },
  {
    name: 'Chicago Defender',
    url: 'https://chicagodefender.com/feed/',
    purpose: ' Cover the interests of the urban African American community.',
    categories: ['Politics'],
    logo: '/images/logos/chicago-defender.png',
    logo2: '/images/logos/chicago-defender-2.png'
  },
  {
    name: 'Black Enterprise',
    url: 'https://www.blackenterprise.com/feed/',
    purpose: 'Primarily business but also covers politics affecting the African American community.',
    categories: ['Business', 'Politics'],
    logo: '/images/logos/be.png',
    logo2: '/images/logos/be-2.png'
  },
  {
    name: 'Essence',
    url: 'https://www.essence.com/feed/',
    purpose: 'Primarily focused on African American women.',
    categories: ['Entertainment', 'Black Women', 'Culture'],
    logo: '/images/logos/essence.png',
    logo2: '/images/logos/essence-2.png'
  },
  {
    name: 'Blavity',
    url: 'https://blavity.com/rss.xml',
    purpose: 'Covers stories and opinion pieces that matter to Black Millennials.',
    categories: ['Culture'],
    logo: '/images/logos/blavity.png',
    logo2: '/images/logos/blavity-2.png'
  },
  {
    name: 'BlackPRWire',
    url: 'https://www.blackprwire.com/rss/rss_all.php',
    purpose: 'Premier news distribution service center',
    categories: ['Politics'],
    logo: '/images/logos/black-wire.png',
    logo2: '/images/logos/black-wire-2.png'
  },
  {
    name: 'Urban Geekz',
    url: 'https://urbangeekz.com/feed/',
    purpose: 'Making Tech more colorful, accessible and diverse',
    categories: ['Technology'],
    logo: '/images/logos/urban-geekz.png',
    logo2: '/images/logos/urban-geekz-2.png'
  },
  {
    name: 'Amsterdam News',
    url: 'https://amsterdamnews.com/feed/',
    purpose: 'The New Black View',
    categories: ['Culture', 'Politics'],
    logo: '/images/logos/amsterdam-news.png',
    logo2: '/images/logos/amsterdam-news-2.png'
  },
  {
    name: 'Black Press USA',
    url: 'https://blackpressusa.com/feed/',
    purpose: 'The Voice of the Black Community',
    categories: ['Culture'],
    logo: '/images/logos/black-press-media.png',
    logo2: '/images/logos/black-press-media-2.png'
  },
  {
    name: 'The Network Journal',
    url: 'https://tnj.com/feed/',
    purpose: 'Black Professionals and Small Business Magazine.',
    categories: ['Business'],
    logo: '/images/logos/network-journal.png',
    logo2: '/images/logos/network-journal-2.png'
  },
  {
    name: 'BlackGirlNerds',
    url: 'https://blackgirlnerds.com/feed/',
    purpose: 'Diverse women who embrace all cultures and refuse to conform to the status quo.',
    categories: ['Culture', 'Black Women'],
    logo: '/images/logos/black-girls.png',
    logo2: '/images/logos/black-girls-2.png'
  },
  {
    name: 'Watch The Yard',
    url: 'https://www.watchtheyard.com/feed/',
    purpose: 'Black Greekdom Digital Yardshow.',
    categories: ['Culture'],
    logo: '/images/logos/watch-yard.png',
    logo2: '/images/logos/watch-yard-2.png'
  },
  {
    name: 'AfroTech',
    url: 'https://afrotech.com/rss.xml',
    purpose: 'Covers entrepreneurship, technology, and business news tailored for the Black community.',
    categories: ['Technology', 'Business'],
    logo: '/images/logos/afro-tech.png',
    logo2: '/images/logos/afro-tech-2.png'
  },
  {
    name: 'Travel Noire',
    url: 'https://travelnoire.com/rss.xml',
    purpose: 'A travel site, geared towards the Black community, covers lifestyle and culture.',
    categories: ['Travel'],
    logo: '/images/logos/travel-noire.png',
    logo2: '/images/logos/travel-noire-2.png'
  },
  {
    name: 'AAIHS',
    url: 'https://www.aaihs.org/feed/',
    purpose: 'An independent scholarly organization in researching, writing, and teaching black thought and culture.',
    categories: ['Education'],
    logo: '/images/logos/aaihs.png',
    logo2: '/images/logos/aaihs-2.png'
  },
  {
    name: 'BlackNews.com',
    url: 'http://blacknews.com/feed/',
    purpose: 'An online news platform featuring the latest news for and about African Americans.',
    categories: ['Culture'],
    logo: '/images/logos/blacknews.png',
    logo2: '/images/logos/blacknews-2.png'
  },
  {
    name: 'SoulBounce',
    url: 'http://soulbounce.com/feed/',
    purpose: 'The premiere global soul music website that represents the past, present and future of soul music.',
    categories: ['Entertainment'],
    logo: '/images/logos/soulbounce.png',
    logo2: '/images/logos/soulbounce-2.png'
  },
  {
    name: 'Diverse',
    url: 'https://www.diverseeducation.com/feed/',
    purpose: 'Critical news and insightful commentary on issues concerning diversity in American higher education.',
    categories: ['Education'],
    logo: '/images/logos/diverse.png',
    logo2: '/images/logos/diverse-2.png'
  },
];

export default sortByName(blackAmericanData);
