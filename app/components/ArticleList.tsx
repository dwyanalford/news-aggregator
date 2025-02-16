// app/components/ArticleList.tsx
"use client";

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

interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return <p className="text-gray-500">No articles available.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
          <li key={article.id} className="article-card mb-6">
          {article.imageURL && (
            <img
              src={article.imageURL}
              alt={article.title}
              className="w-full h-48 object-cover rounded mb-3"
              loading="lazy"
            />
          )}
        
          <h2 className="article-card-title">{article.title}</h2>
          <p className="article-card-meta">
            {article.date} 
            {article.author && <> • {article.author}</>}
          </p>
        
          <p className="article-card-summary">{article.summary}</p>
        
          <div className="article-card-actions">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card-button"
            >
              Read More
            </a>
            {/* Example “Save” or other button */}
            <button className="article-card-button">Save</button>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}