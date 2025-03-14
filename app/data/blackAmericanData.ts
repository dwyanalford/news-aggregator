import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string; // Adding the new key to the interface
}

const blackAmericanData: NewsSource[] = [
  {
    name: 'The Root',
    url: 'https://www.theroot.com/rss',
    purpose: 'Black News and Black Views with a Whole Lotta Attitude',
    logo: '/images/logos/the-root.png',
    logo2: '/images/logos/the-root-2.png'
  },
  {
    name: 'Atlantic Black Star',
    url: 'https://atlantablackstar.com/feed/',
    purpose: 'News, entertainment, and more',
    logo: '/images/logos/atlantic-black-star.png',
    logo2: '/images/logos/atlantic-black-star-2.png'
  },
  {
    name: 'Black America Web',
    url: 'https://blackamericaweb.com/feed/',
    purpose: 'Latest Black American News',
    logo: '/images/logos/black-america-web.png',
    logo2: '/images/logos/black-america-web-2.png'
  },
  {
    name: 'Ebony',
    url: 'https://www.ebony.com/feed/',
    purpose: 'Culture, news, and lifestyle from an African American perspective',
    logo: '/images/logos/ebony.png',
    logo2: '/images/logos/ebony-2.png'
  },
  {
    name: 'The Grio',
    url: 'https://thegrio.com/feed/',
    purpose: 'Focuses on breaking news, opinion, politics, and more',
    logo: '/images/logos/grio.png',
    logo2: '/images/logos/grio-2.png'
  },
  {
    name: 'MadameNoire',
    url: 'https://madamenoire.com/feed/',
    purpose: 'Focused primarily on Black womens lifestyle, health, and current events',
    logo: '/images/logos/madame-noire.png',
    logo2: '/images/logos/madame-noire-2.png'
  },
  {
    name: 'News One',
    url: 'https://newsone.com/feed/',
    purpose: 'National news tailored to an African American audience',
    logo: '/images/logos/news-one.png',
    logo2: '/images/logos/news-one-2.png'
  },
  {
    name: 'Our weekly',
    url: 'https://www.ourweekly.com/rss/',
    purpose: 'African American news and entertainment source (Los Angeles)',
    logo: '/images/logos/our-weekly.png',
    logo2: '/images/logos/our-weekly-2.png'
  },
  {
    name: 'Rolling Out',
    url: 'https://rollingout.com/feed/',
    purpose: 'Focused on African American culture, politics, and entertainment.',
    logo: '/images/logos/rolling-out.png',
    logo2: '/images/logos/rolling-out-2.png'
  },
  {
    name: 'Source',
    url: 'https://thesource.com/feed/',
    purpose: 'Focuses on music and entertainment, but also covers social and political issues.',
    logo: '/images/logos/source.png',
    logo2: '/images/logos/source-2.png'
  },
  {
    name: 'Vibe',
    url: 'https://www.vibe.com/feed/',
    purpose: 'Music, celebrities, and current events.',
    logo: '/images/logos/vibe.png',
    logo2: '/images/logos/vibe-2.png'
  },
  {
    name: 'XXL',
    url: 'https://www.xxlmag.com/feed/',
    purpose: 'Primarily focused on hip-hop but includes social issues as well.',
    logo: '/images/logos/xxl.png',
    logo2: '/images/logos/xxl-2.png'
  },
  {
    name: 'News Afro',
    url: 'https://afro.com/feed/',
    purpose: 'Black Media Authority',
    logo: '/images/logos/afro-news.png',
    logo2: '/images/logos/afro-news-2.png'
  },
  {
    name: 'Chicago Defender',
    url: 'https://chicagodefender.com/feed/',
    purpose: ' Cover the interests of the urban African American community.',
    logo: '/images/logos/chicago-defender.png',
    logo2: '/images/logos/chicago-defender-2.png'
  },
  {
    name: 'Black Enterprise',
    url: 'https://www.blackenterprise.com/feed/',
    purpose: 'Primarily business but also covers politics affecting the African American community.',
    logo: '/images/logos/be.png',
    logo2: '/images/logos/be-2.png'
  },
  {
    name: 'Essence',
    url: 'https://www.essence.com/feed/',
    purpose: 'Primarily focused on African American women.',
    logo: '/images/logos/essence.png',
    logo2: '/images/logos/essence-2.png'
  },
  {
    name: 'Blavity',
    url: 'https://blavity.com/rss.xml',
    purpose: 'Covers stories and opinion pieces that matter to Black Millennials.',
    logo: '/images/logos/blavity.png',
    logo2: '/images/logos/blavity-2.png'
  },
  {
    name: 'BlackPRWire',
    url: 'https://www.blackprwire.com/rss/rss_all.php',
    purpose: 'Premier news distribution service center',
    logo: '/images/logos/black-wire.png',
    logo2: '/images/logos/black-wire-2.png'
  },
  {
    name: 'Urban Geekz',
    url: 'https://urbangeekz.com/feed/',
    purpose: 'Making Tech more colorful, accessible and diverse',
    logo: '/images/logos/urban-geekz.png',
    logo2: '/images/logos/urban-geekz-2.png'
  },
  {
    name: 'Amsterdam News',
    url: 'https://amsterdamnews.com/feed/',
    purpose: 'The New Black View',
    logo: '/images/logos/amsterdam-news.png',
    logo2: '/images/logos/amsterdam-news-2.png'
  },
  {
    name: 'Black Press USA',
    url: 'https://blackpressusa.com/feed/',
    purpose: 'The Voice of the Black Community',
    logo: '/images/logos/black-press-media.png',
    logo2: '/images/logos/black-press-media-2.png'
  },
  {
    name: 'BlackGirlNerds',
    url: 'https://blackgirlnerds.com/feed/',
    purpose: 'Diverse women who embrace all cultures and refuse to conform to the status quo.',
    logo: '/images/logos/black-girls.png',
    logo2: '/images/logos/black-girls-2.png'
  },
  {
    name: 'Watch The Yard',
    url: 'https://www.watchtheyard.com/feed/',
    purpose: 'Black Greekdom Digital Yardshow.',
    logo: '/images/logos/watch-yard.png',
    logo2: '/images/logos/watch-yard-2.png'
  },
  {
    name: 'AfroTech',
    url: 'https://afrotech.com/rss.xml',
    purpose: 'Covers entrepreneurship, technology, and business news tailored for the Black community.',
    logo: '/images/logos/afro-tech.png',
    logo2: '/images/logos/afro-tech-2.png'
  },
  {
    name: 'Travel Noire',
    url: 'https://travelnoire.com/rss.xml',
    purpose: 'A travel site, geared towards the Black community, covers lifestyle and culture.',
    logo: '/images/logos/travel-noire.png',
    logo2: '/images/logos/travel-noire-2.png'
  },
  {
    name: 'AAIHS',
    url: 'https://www.aaihs.org/feed/',
    purpose: 'An independent scholarly organization in researching, writing, and teaching black thought and culture.',
    logo: '/images/logos/aaihs.png',
    logo2: '/images/logos/aaihs-2.png'
  },
  {
    name: 'BlackNews.com',
    url: 'http://blacknews.com/feed/',
    purpose: 'An online news platform featuring the latest news for and about African Americans.',
    logo: '/images/logos/blacknews.png',
    logo2: '/images/logos/blacknews-2.png'
  },
  {
    name: 'SoulBounce',
    url: 'http://soulbounce.com/feed/',
    purpose: 'The premiere global soul music website that represents the past, present and future of soul music.',
    logo: '/images/logos/soulbounce.png',
    logo2: '/images/logos/soulbounce-2.png'
  },
  {
    name: 'Diverse',
    url: 'https://www.diverseeducation.com/feed/',
    purpose: 'Critical news and insightful commentary on issues concerning diversity in American higher education.',
    logo: '/images/logos/diverse.png',
    logo2: '/images/logos/diverse-2.png'
  },
  {
    name: 'Black Doctor',
    url: 'https://blackdoctor.org/feed/',
    purpose: 'Where Wellness & Culture Connect.',
    logo: '/images/logos/black-doctor.png',
    logo2: '/images/logos/black-doctor-2.png'
  },
  {
    name: 'Andscape',
    url: 'https://andscape.com/feed/',
    purpose: 'Black-led media platform dedicated to creating, highlighting, and uplifting the diverse stories of Black identity.',
    logo: '/images/logos/andscape.png',
    logo2: '/images/logos/andscape-2.png'
  },
  {
    name: 'Urban Faith',
    url: 'https://urbanfaith.com/feed/',
    purpose: 'Your destination for relevant and stimulating conversations about faith and life.',
    logo: '/images/logos/urban-faith.png',
    logo2: '/images/logos/urban-faith-2.png'
  },
  {
    name: 'Philly Tribune',
    url: 'https://www.phillytrib.com/search/?f=rss&t=article&c=news/*',
    purpose: 'The oldest (1884) continuously published newspaper reflecting the African-American experience.',
    logo: '/images/logos/philly-tribune.png',
    logo2: '/images/logos/philly-tribune-2.png'
  },
  {
    name: 'Face2Face Africa',
    url: 'https://face2faceafrica.com/feed',
    purpose: 'The leading afro-diaspora news platform.',
    logo: '/images/logos/face2face.png',
    logo2: '/images/logos/face2face-2.png'
  },
  {
    name: 'Afram News',
    url: 'https://aframnews.com/feed/',
    purpose: 'The African American News and Issues Newspaper is to address current and historical issues that are impacting the African American community.',
    logo: '/images/logos/afram.png',
    logo2: '/images/logos/afram-2.png'
  },
  {
    name: 'Our Time Press',
    url: 'https://ourtimepress.com/feed/',
    purpose: 'The African American News and Issues Newspaper is to address current and historical issues that are impacting the African American community.',
    logo: '/images/logos/our-time.png',
    logo2: '/images/logos/our-time-2.png'
  },
  {
    name: 'Birmingham Times',
    url: 'http://www.birminghamtimes.com/feed/',
    purpose: 'Focuses on News from the Birmingham, Alabama Community.',
    logo: '/images/logos/birmingham-times.png',
    logo2: '/images/logos/birmingham-times-2.png'
  },
  {
    name: 'Washington Informer',
    url: 'https://www.washingtoninformer.com/feed/',
    purpose: 'A Black, woman-owned multimedia news organization serving the African-Americans in the DMV.',
    logo: '/images/logos/wash-inform.png',
    logo2: '/images/logos/wash-inform-2.png'
  },
  {
    name: 'TSDMemphis.com',
    url: 'http://tri-statedefender.com/feed/',
    purpose: 'Information. Inspiration. Elevation.',
    logo: '/images/logos/tri-state.png',
    logo2: '/images/logos/tri-state-2.png'
  },
  {
    name: 'St. Louis American',
    url: 'https://www.stlamerican.com/feed/',
    purpose: 'The leading, most-trusted voice of the African-American community and largest weekly newspaper in the entire state of Missouri.',
    logo: '/images/logos/st-louis.png',
    logo2: '/images/logos/st-louis-2.png'
  },
  {
    name: 'Nubian Message',
    url: 'https://www.thenubianmessage.com/feed/',
    purpose: 'Nubian Message is currently a biweekly publication and one of five student-run outlets within NC State Student Media.',
    logo: '/images/logos/nubian-message.png',
    logo2: '/images/logos/nubian-message-2.png'
  },
  {
    name: 'Tennessee Tribune',
    url: 'https://tntribune.com/feed/',
    purpose: 'Unlike other weeklies that have lost touch with important issues facing today’s Black families, The Tribune offers a fresh and encouraging view on people and events that have a positive impact.',
    logo: '/images/logos/ten-tribune.png',
    logo2: '/images/logos/ten-tribune-2.png'
  },
];

export default sortByName(blackAmericanData);
