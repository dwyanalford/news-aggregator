// app/components/NewsSource.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsOptions from './NewsOptions';
import SaveButton from './SaveButton';
import { useSavedArticlesStore } from '@/app/store/useSavedArticlesStore';
import Loading from './Loading'; // Import your Loading component

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
  data: any[]; // Dynamic region-specific data passed down
}

// Function to fetch article data from the server-side API
async function fetchArticleData(articleUrl: string): Promise<{ imageUrl: string | null; firstParagraph: string }> {
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
  const lastPeriodIndex = truncated.lastIndexOf('.');

  if (lastPeriodIndex !== -1) {
    return truncated.slice(0, lastPeriodIndex + 1);
  }
  return truncated.trimEnd() + ' ...';
}

export default function NewsSource({ name, purpose, items, data }: NewsSourceProps) {
  const [articles, setArticles] = useState<Record<number, { imageUrl: string | null; firstParagraph: string }>>({});
  const [isLoading, setIsLoading] = useState<boolean[]>([]); // Track loading state for each article

  // Use Zustand store
  const savedArticles = useSavedArticlesStore((state) => state.savedArticles); // Use Zustand state
  const fetchSavedArticles = useSavedArticlesStore((state) => state.fetchSavedArticles); // Use Zustand action
  const addSavedArticle = useSavedArticlesStore((state) => state.addSavedArticle); // Use Zustand action

  // Fetch saved articles from Zustand when the component mounts and synchronize state
  useEffect(() => {
    fetchSavedArticles();
  }, [fetchSavedArticles]); // Add dependency

  const handleArticleSaved = (link: string) => {
    if (!savedArticles.includes(link)) {
      addSavedArticle(link); // Use Zustand action to add saved article
    }
  };

  // Fetch all articles in parallel
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(new Array(items.length).fill(true)); // Initialize all articles as loading

      const fetchPromises = items.map(({ link }, index) =>
        fetchArticleData(link).then((articleData) => {
          setArticles((prevArticles) => ({
            ...prevArticles,
            [index]: articleData,
          }));
          setIsLoading((prevLoading) => {
            const updatedLoading = [...prevLoading];
            updatedLoading[index] = false; // Mark this article as loaded
            return updatedLoading;
          });
        })
      );

      await Promise.all(fetchPromises);
    };

    fetchArticles();
  }, [items]);

  // Find the corresponding source in the data file to get the logo
  const currentSourceData = Array.isArray(data)
    ? data.find((source: any) => source.name === name)
    : null;

  const logo = currentSourceData?.logo2 || ''; // Safely access the logo

  return (
    <div id="news-source">
      {/* Main Publication Title */}
      <div className="flex flex-col md:flex-row items-center w-full space-x-4">
        {logo && (
          <img
            src={logo}
            alt={`${name} logo`}
            className="rounded-t-lg shadow-xl"
          />
        )}
        <div className="flex items-center">
          <p className="sub-text">{purpose}</p>
        </div>
      </div>

      {/* Articles */}
      <div id="news-container" className="flex flex-wrap justify-center">
        {items.map(({ title, pubDate, link, description, author }, index) => {
          const article = articles[index];
          return (
            <div
              key={index}
              id="news-articles"
              className="transition-transform transform hover:scale-105 md:w-1/2 lg:w-1/2 2xl:w-1/3 p-4 2xl:mb-6"
            >
              <div id="news-content" className="h-full flex flex-col shadow-lg rounded-t-lg p-1 border border-gray-200">
                {/* Article Image */}
                <div id="articles-image" className="w-full h-60 max-w-md relative">
                  {isLoading[index] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-t-lg">
                      <Loading isLoading={true} /> {/* Show loading spinner */}
                    </div>
                  ) : article?.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={title || 'No Image Available'}
                      className="w-full h-full object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="/images/no-image.png"
                      alt="No Image Available"
                      className="w-full h-full object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Article Text */}
                <div id="articles-text" className="text-left p-2 2xl:p-4 max-w-md">
                  <p className="text-md text-gray-500 pt-3 2xl:pt-0 2xl:pb-2">{formatPubDate(pubDate)}</p>
                  <h2 className="text-xl font-bold pt-3 2xl:pt-0">{title}</h2>
                  <div className="hidden sm:block pt-3 2xl:pt-4">
                    <p className="text-gray-800 font-light text-lg">
                      <strong>Excerpt:</strong>{' '}
                      {truncateSummary(article?.firstParagraph || 'No summary available')}
                    </p>
                  </div>
                </div>

                {/* Article Options */}
                <div id="news-options" className="flex flex-col mt-auto">
                  <NewsOptions link={link} />
                  <SaveButton
                    article={{
                      title,
                      date: pubDate,
                      link,
                      summary: truncateSummary(article?.firstParagraph || 'No summary available'),
                      imageURL: article?.imageUrl ?? undefined,
                    }}
                    isSaved={savedArticles.includes(link)}
                    onArticleSaved={handleArticleSaved}
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
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
