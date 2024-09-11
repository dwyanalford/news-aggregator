"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ArticleRemoveButton from './ArticleRemoveButton';

interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL: string;
}

const SavedArticles = () => {
  const { data: session } = useSession();  // Ensure user is authenticated
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      // Fetch saved articles from the backend
      fetch('/api/articles/getSaved')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch saved articles');
          }
          return response.json();
        })
        .then((data) => {
          setArticles(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [session]);

  const handleRemove = (link: string) => {
    setArticles((prevArticles) => prevArticles.filter(article => article.link !== link));
  };

  if (!session) return <p>Please log in to view your saved articles.</p>;
  if (loading) return <p>Loading saved articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Your Saved Articles</h1>
      {articles.length === 0 ? (
        <p>You have no saved articles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="p-4 border rounded shadow">
              <img src={article.imageURL} alt={article.title} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
              <p className="mt-2">{article.summary}</p>
              <div className="flex items-center space-x-6 mt-4"> 
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-inactive"
                >
                  Read More
                </a>
                {/* Add RemoveButton for each article */}
                <ArticleRemoveButton link={article.link} onRemove={() => handleRemove(article.link)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;