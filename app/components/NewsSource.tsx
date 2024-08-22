// app/components/NewsSource.tsx

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NewsOptions from './NewsOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import blackAmericanData from '../data/blackAmericanData';

interface NewsItem {
  name: any;
  title: string;
  pubDate: string;
  link: string;
  description?: string;
  author?: string;
}

interface NewsSourceProps {
  name: string;
  purpose: string;
  items: NewsItem[];
}

// Function to fetch article data from the server-side API
async function fetchArticleData(articleUrl: string): Promise<{ imageUrl: string | null, firstParagraph: string }> {
  try {
    const { data } = await axios.get(`/api/extract-image?url=${encodeURIComponent(articleUrl)}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch article data from ${articleUrl}:`, error);
    return { imageUrl: null, firstParagraph: 'Failed to load summary' };
  }
}

// Limit the amount of characters from articles to display in frontend
function truncateSummary(summary: string, maxLength: number = 252): string {
  if (summary.length <= maxLength) {
    return summary.endsWith('.') ? summary : summary + '.';
  }

  const truncated = summary.slice(0, maxLength);
  const lastPeriodIndex = truncated.lastIndexOf(".");

  if (lastPeriodIndex !== -1) {
    return truncated.slice(0, lastPeriodIndex + 1);
  }
  return truncated.trimEnd() + ' ...';
}

export default function NewsSource({ name, purpose, items }: NewsSourceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<Record<number, { imageUrl: string | null, firstParagraph: string }>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({}); // State to track loading images

  useEffect(() => {
    const fetchArticles = async () => {
      for (let i = 0; i < items.length; i++) {
        const { link } = items[i];
        const articleData = await fetchArticleData(link);
        setArticles((prevArticles) => ({
          ...prevArticles,
          [i]: articleData,
        }));
        setLoadingImages((prevLoadingImages) => ({
          ...prevLoadingImages,
          [i]: false, // Mark image as not loading once the data is fetched
        }));
      }
    };

    fetchArticles();
  }, [items]);

  const handleItemHover = (index: number) => {
    setExpandedIndex(index);
  };

  const handleItemLeave = () => {
    setExpandedIndex(null);
  };

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  // Find the corresponding source in blackAmericanData to get the logo
  const currentSource = items.length > 0 ? items[0].name : '';
  const currentSourceData = blackAmericanData.find(source => source.name === name);
  const logo = currentSourceData?.logo;

  return (
    <div className="relative pl-6 pt-6">
      <h2 className="text-2xl font-bold pb-6 flex items-center text-slate-300">
        {logo && (
          <img src={logo} alt={`${name} logo`} className="w-10 h-10 mr-3 rounded-lg border-2 border-slate-400" /> // Adjusted size for title logos
        )}
        {name}
        <span className="text-lg font-semibold capitalize ml-2 text-slate-400">| {purpose}</span>
      </h2>
      
      <button className="absolute -left-2 top-1/2 transform -translate-y-1/2 p-2  bg-gray-800 bg-opacity-50 rounded-full" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} size="3x" className="text-white transform scale-x-75" />
      </button>
  
      <div ref={carouselRef} className="flex overflow-x-hidden space-x-6 h-full">
        {items.map(({ title, pubDate, link, description, author }, index) => (
          <div
            key={index}
            className="min-w-[300px] shadow-lg rounded-lg hover:shadow-lg transition-shadow bg-slate-200 border-2 mt-2"
            onMouseEnter={() => handleItemHover(index)}
            onMouseLeave={() => handleItemLeave()}
          >
            <img
              src={articles[index]?.imageUrl || '/images/loading-animation.gif'} // Use placeholder if image is not loaded
              alt={title}
              className="w-full h-48 object-cover rounded-t-md"
              onLoad={() => setLoadingImages(prev => ({ ...prev, [index]: true }))} // Mark image as loaded
            />
            <h3 className="text-xl font-bold leading-tight pl-4 pr-4 pt-3">{title}</h3>
            <p className="text-gray-500 pl-4"> {formatPubDate(pubDate)} </p>
            
            <p className="mt-2 text-base leading-snug p-4">
              <strong>Excerpt:</strong> {truncateSummary(articles[index]?.firstParagraph || 'No summary available')}
            </p>
            
            <NewsOptions link={link} />
            {author && <p className="text-sm text-gray-500 pl-4 mt-6">Author: {author}</p>}
            <code className="block mt-2 text-sm text-gray-500 pl-4">Source: {name}</code>
          </div>
        ))}
      </div>
  
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 rounded-full" onClick={scrollRight}>
        <FontAwesomeIcon icon={faChevronRight} size="3x" className="text-white transform scale-x-75" />
      </button>
    </div>
  );
}

export function formatPubDate(pubDate: string): string {
  const date = new Date(pubDate);
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
