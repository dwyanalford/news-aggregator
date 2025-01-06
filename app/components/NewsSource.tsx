// app/components/NewsSource.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsOptions from './NewsOptions';
import SaveButton from './SaveButton';
import blackAmericanData from '../data/blackAmericanData';
import { useSavedArticlesStore } from '@/app/store/useSavedArticlesStore'

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
  const [articles, setArticles] = useState<Record<number, { imageUrl: string | null, firstParagraph: string }>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({}); // State to track loading images
  
  // Use Zustand store
  const savedArticles = useSavedArticlesStore((state) => state.savedArticles); // Use Zustand state
  const fetchSavedArticles = useSavedArticlesStore((state) => state.fetchSavedArticles); // Use Zustand action
  const addSavedArticle = useSavedArticlesStore((state) => state.addSavedArticle); // Use Zustand action

  // Fetch saved articles when the component mounts and synchronize state
  useEffect(() => {
    fetchSavedArticles(); // Fetch saved articles from Zustand when the component mounts
  }, []);

  const handleArticleSaved = (link: string) => {
    if (!savedArticles.includes(link)) {
      addSavedArticle(link); // Use Zustand action to add saved article
    }
  };

  // Instead of fetching each article one at a time, use Promise.all to fetch all articles in parallel, 
  // which will reduce the total loading time.
  useEffect(() => {
    const fetchArticles = async () => {
      const fetchPromises = items.map(({ link }, index) => 
        fetchArticleData(link).then(articleData => {
          setArticles(prevArticles => ({
            ...prevArticles,
            [index]: articleData,
          }));
          setLoadingImages(prevLoadingImages => ({
            ...prevLoadingImages,
            [index]: false, // Mark image as not loading once the data is fetched
          }));
        })
      );
  
      await Promise.all(fetchPromises);
    };
  
    fetchArticles();
  }, [items]);
  

  // Find the corresponding source in blackAmericanData to get the logo
  const currentSourceData = blackAmericanData.find(source => source.name === name);
  const logo = currentSourceData?.logo2;

  return (
      <div id="news-source">
        {/* Main Publication Title */}
        <div className="flex flex-col md:flex-row items-center w-full space-x-4">
          {logo && <img src={logo} alt={`${name} logo`} className="rounded-t-lg shadow-xl" />} {/* Use the original size of the logo */}
          <div className="flex items-center"> {/* Center-align text vertically */}
            <p className="text-gray-700 text-xl font-light">{purpose}</p>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}

        <div id="news-container" className='flex flex-wrap justify-center'>
          {items.map(({ title, pubDate, link, description, author }, index) => {
            
            return (
              <div
                key={index}
                id="news-articles"
                className="transition-transform transform hover:scale-105 md:w-1/2 lg:w-1/2 2xl:w-1/3 p-4 2xl:mb-6"
              >
                <div id="news-content" className="h-full flex flex-col shadow-lg rounded-t-lg p-1 border border-gray-200">
                  {/* Articles Image */}
                  <div id="articles-image" className="w-full h-60 max-w-md"> 
                    {articles[index]?.imageUrl && (
                      <img
                        src={articles[index].imageUrl}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-lg"
                        loading='lazy'
                      />
                    )}
                  </div>

                  {/* Articles Text */}
                  <div id="articles-text" className="text-left p-2 2xl:p-4 max-w-md">
                    <p className="text-sm text-gray-500 pt-3 2xl:pt-0 2xl:pb-2">{formatPubDate(pubDate)}</p>
                    <h2 className="text-xl font-bold pt-3 2xl:pt-0">{title}</h2>
                    <div className="hidden sm:block pt-3 2xl:pt-4">
                      <p className="text-gray-800 font-light text-lg">
                        <strong>Excerpt:</strong> {truncateSummary(articles[index]?.firstParagraph || 'No summary available')}
                      </p>
                    </div>
                  </div>
                  <div id="news-options" className="flex flex-col mt-auto">
                    {/* <p className="text-sm text-gray-500 hidden xl:block pb-4 text-center">Source: {name}</p> */}
                    <NewsOptions link={link} />
                    <SaveButton 
                      article={{ 
                        title, 
                        date: pubDate, 
                        link, 
                        summary: truncateSummary(articles[index]?.firstParagraph || 'No summary available'),  // Truncated summary passed to SaveButton
                        imageURL: articles[index]?.imageUrl ?? undefined  
                      }} 
                      isSaved={savedArticles.includes(link)}  // Pass down a prop to indicate if the article is saved
                      onArticleSaved={handleArticleSaved}  // Pass down the callback to handle saved state
                    />
                  </div>
                </div>
              </div> 
            );
          })}
         </div>  
      </div>
  );
}

export function formatPubDate(pubDate: string): string {
  const date = new Date(pubDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Corrected type
    month: 'long',   // Corrected type
    day: 'numeric',  // Corrected type
    year: 'numeric', // Corrected type
  };
  
  // Assuming `date` is a valid Date object
  return date.toLocaleDateString('en-US', options);
  
}
