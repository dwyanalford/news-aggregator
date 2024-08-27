import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  categories: string[];
  logo: string;
}

const blackAmericanData: NewsSource[] = [
  {
    name: 'The Root',
    url: 'https://www.theroot.com/rss',
    purpose: 'Black News and Black Views with a Whole Lotta Attitude',
    categories: ['Politics'],
    logo: '/images/logos/the-root.png'
  },
  {
    name: 'Atlantic Black Star',
    url: 'https://atlantablackstar.com/feed/',
    purpose: 'News, entertainment, and more',
    categories: ['Politics', 'Entertainment'],
    logo: '/images/logos/atlantic-black-star.png'
  },
  {
    name: 'Black America Web',
    url: 'https://blackamericaweb.com/feed/',
    purpose: 'Latest Black American News',
    categories: ['Politics'],
    logo: '/images/logos/black-america-web.png'
  },
  {
    name: 'Ebony',
    url: 'https://www.ebony.com/feed/',
    purpose: 'Culture, news, and lifestyle from an African American perspective',
    categories: ['Culture'],
    logo: '/images/logos/ebony.png'
  },
  {
    name: 'The Grio',
    url: 'https://thegrio.com/feed/',
    purpose: 'Focuses on breaking news, opinion, politics, and more',
    categories: ['Politics'],
    logo: '/images/logos/grio.png'
  },
  {
    name: 'MadameNoire',
    url: 'https://madamenoire.com/feed/',
    purpose: 'Focused primarily on Black womens lifestyle, health, and current events',
    categories: ['Culture', 'Black Women'],
    logo: '/images/logos/madame-noire.png'
  },
  {
    name: 'News One',
    url: 'https://newsone.com/feed/',
    purpose: 'National news tailored to an African American audience',
    categories: ['Politics'],
    logo: '/images/logos/news-one.png'
  },
  {
    name: 'Our weekly',
    url: 'https://www.ourweekly.com/rss/',
    purpose: 'African American news and entertainment source (Los Angeles)',
    categories: ['Entertainment'],
    logo: '/images/logos/our-weekly.png'
  },
  {
    name: 'Rolling Out',
    url: 'https://rollingout.com/feed/',
    purpose: 'Focused on African American culture, politics, and entertainment.',
    categories: ['Culture', 'Politics', 'Entertainment'],
    logo: '/images/logos/rolling-out.png'
  },
  {
    name: 'Source',
    url: 'https://thesource.com/feed/',
    purpose: 'Focuses on music and entertainment, but also covers social and political issues.',
    categories: ['Entertainment'],
    logo: '/images/logos/source.png'
  },
  {
    name: 'Vibe',
    url: 'https://www.vibe.com/feed/',
    purpose: 'Music, celebrities, and current events.',
    categories: ['Entertainment'],
    logo: '/images/logos/vibe.png'
  },
  {
    name: 'XXL',
    url: 'https://www.xxlmag.com/feed/',
    purpose: 'Primarily focused on hip-hop but includes social issues as well.',
    categories: ['Entertainment'],
    logo: '/images/logos/xxl.png'
  },
  {
    name: 'News Afro',
    url: 'https://afro.com/feed/',
    purpose: 'Black Media Authority',
    categories: ['Politics'],
    logo: '/images/logos/afro-news.png'
  },
  {
    name: 'Chicago Defender',
    url: 'https://chicagodefender.com/feed/',
    purpose: 'Powered by Real Times Media',
    categories: ['Politics'],
    logo: '/images/logos/chicago-defender.png'
  },
  {
    name: 'Black Enterprise',
    url: 'https://www.blackenterprise.com/feed/',
    purpose: 'Primarily business but also covers politics affecting the African American community.',
    categories: ['Business', 'Politics'],
    logo: '/images/logos/be.png'
  },
  {
    name: 'Essence',
    url: 'https://www.essence.com/feed/',
    purpose: 'Primarily focused on African American women.',
    categories: ['Entertainment', 'Black Women', 'Culture'],
    logo: '/images/logos/essence.png'
  },
  {
    name: 'Blavity',
    url: 'https://blavity.com/rss.xml',
    purpose: 'Covers stories and opinion pieces that matter to Black Millennials.',
    categories: ['Culture'],
    logo: '/images/logos/blavity.png'
  },
  {
    name: 'BlackPRWire',
    url: 'https://www.blackprwire.com/rss/rss_all.php',
    purpose: 'Premier news distribution service center',
    categories: ['Politics'],
    logo: '/images/logos/black-press-media.png'
  },
  {
    name: 'Urban Geekz',
    url: 'https://urbangeekz.com/feed/',
    purpose: 'Making Tech more colorful, accessible and diverse',
    categories: ['Technology'],
    logo: '/images/logos/urban-geekz.png'
  },
  {
    name: 'Amsterdam News',
    url: 'https://amsterdamnews.com/feed/',
    purpose: 'The New Black View',
    categories: ['Culture', 'Politics'],
    logo: '/images/logos/amsterdam-news.png'
  },
  {
    name: 'Black Press USA',
    url: 'https://blackpressusa.com/feed/',
    purpose: 'The Voice of the Black Community',
    categories: ['Culture'],
    logo: '/images/logos/black-press-media.png'
  },
  {
    name: 'The Network Journal',
    url: 'https://tnj.com/feed/',
    purpose: 'Black Professionals and Small Business Magazine',
    categories: ['Business'],
    logo: '/images/logos/network-journal.png'
  },
  {
    name: 'BlackGirlNerds',
    url: 'https://blackgirlnerds.com/feed/',
    purpose: 'Diverse women who embrace all cultures and refuse to conform to the status quo.',
    categories: ['Culture', 'Black Women'],
    logo: '/images/logos/black-girls.png'
  },
  {
    name: 'Watch The Yard',
    url: 'https://www.watchtheyard.com/feed/',
    purpose: 'Black Greekdom Digital Yardshow',
    categories: ['Culture'],
    logo: '/images/logos/watch-yard.png'
  },
  {
    name: 'AfroTech',
    url: 'https://afrotech.com/rss.xml',
    purpose: 'Covers entrepreneurship, technology, and business news tailored for the Black community.',
    categories: ['Technology', 'Business'],
    logo: '/images/logos/afro-tech.png'
  },
  {
    name: 'Travel Noire',
    url: 'https://travelnoire.com/rss.xml',
    purpose: 'While mainly a travel site, it is geared towards the Black community and covers lifestyle and culture as well.',
    categories: ['Travel'],
    logo: '/images/logos/travel-noire.png'
  },
];

export default sortByName(blackAmericanData);
