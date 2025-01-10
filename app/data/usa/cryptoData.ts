// data/cryptoData.ts
import { sortByName } from '@/app/utils/sortByName';

interface NewsSource {
  name: string;
  url: string;
  purpose: string;
  logo: string;
  logo2: string;
}

const cryptoData: NewsSource[] = [
  {
    name: 'CoinDesk',
    url: 'https://www.coindesk.com/feed/',
    purpose: 'Breaking news, analysis, and information on cryptocurrency and blockchain technology.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'ZyCrypto',
    url: 'https://zycrypto.com/feed/',
    purpose: 'Latest cryptocurrency news, market updates, and blockchain insights.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'Crypto Daily',
    url: 'https://cryptodaily.co.uk/feed',
    purpose: 'Daily updates and news on cryptocurrency, blockchain, and financial markets.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'CryptoSlate',
    url: 'https://cryptoslate.com/feed/',
    purpose: 'Comprehensive cryptocurrency news, insights, and real-time market data.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'NewsBTC',
    url: 'https://www.newsbtc.com/feed/',
    purpose: 'Breaking news, technical analysis, and updates on Bitcoin and other cryptocurrencies.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'Bitcoin Magazine',
    url: 'https://bitcoinmagazine.com/feed/',
    purpose: 'News, analysis, and updates on Bitcoin, blockchain technology, and cryptocurrency.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'Decrypt',
    url: 'https://decrypt.co/feed',
    purpose: 'Cryptocurrency news, original reporting, and blockchain technology insights.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
  {
    name: 'CoinCodex',
    url: 'https://coincodex.com/feed/',
    purpose: 'Cryptocurrency prices, market data, and in-depth blockchain news.',
    logo: '/images/logos/logo-placeholder.png',
    logo2: '/images/logos/crypto-news-title.png',
  },
];

export default sortByName(cryptoData);
