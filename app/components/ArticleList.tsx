// app/components/ArticlesList.tsx
"use client"; // ✅ Marks this as a client component

import { useEffect, useState } from "react";

// ✅ Define the full Article model
interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL?: string;
  author?: string;
  source: string;
  category: string;
  region: string;
}

// ✅ Define props expected in this component
interface ArticlesListProps {
  articles: Article[]; // ✅ Receives articles as a prop
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Simulate loading state when component mounts
  useEffect(() => {
    setLoading(false); // ✅ Assume articles are passed and ready
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ✅ Handle Loading State */}
      {loading ? (
        <p className="text-gray-500">Loading articles...</p>
      ) : error ? (
        /* ✅ Handle Error State */
        <p className="text-red-500">Error: {error}</p>
      ) : articles.length === 0 ? (
        /* ✅ Display when no articles are available */
        <p className="text-gray-500">No articles available.</p>
      ) : (
        /* ✅ Render list of articles */
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="border-b border-gray-300 py-4">
              {/* ✅ Article Image (If Available) */}
              {article.imageURL && (
                <img
                  src={article.imageURL}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
              )}

              {/* ✅ Article Title */}
              <h2 className="text-xl font-bold">{article.title}</h2>

              {/* ✅ Article Metadata (Date, Author, Source) */}
              <p className="text-gray-500 text-sm">
                {article.date} •  Written by {article.author || "Unknown Author"} 
              </p>

              {/* ✅ Article Summary */}
              <p className="text-gray-600 mt-2">{article.summary}</p>

              {/* ✅ Read More Link */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mt-2"
              >
                Read More
              </a>
              <p className="text-gray-500 text-sm mt-4">Category: {article.category}</p>
              <p className="text-gray-500 text-sm">Source: {article.source}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
