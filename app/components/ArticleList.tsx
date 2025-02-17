"use client";

import { FaRegHeart, FaRegBookmark, FaShare, FaMagic, FaExternalLinkAlt } from "react-icons/fa";

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

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <>
      {articles.map((article) => (
        <div
          key={article.id}
          className="w-[400px] h-[475px] flex flex-col bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-black/15 hover:scale-105 rounded-lg dark:bg-gray-800"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden">
            {article.imageURL && (
              <img
                src={article.imageURL}
                alt={article.title}
                className="relative object-cover w-full h-[200px] hover:scale-105"
              />
            )}
            <div className="absolute top-2 right-2">
              <span className="article-card-badge">{article.category}</span>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold mb-3 line-clamp-2 flex-grow">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>{new Date(article.date).toLocaleDateString("en-US", { year: "2-digit", month: "numeric", day: "numeric" })}</span>
              {article.author && (
                <>
                  <span>•</span>
                  <span className="text-gray-400">Author: {article.author}</span>
                </>
              )}
            </div>

            <p className="text-gray-500 mb-4 line-clamp-3">
              {article.summary}
            </p>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-auto p-2 border bg-gray-100 rounded-md hover:border-gray-300 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <HoverTooltip label="Like">
                  <FaRegHeart className="w-5 h-5 cursor-pointer" />
                </HoverTooltip>

                <HoverTooltip label="Save">
                  <FaRegBookmark className="w-5 h-5 cursor-pointer" />
                </HoverTooltip>

                <HoverTooltip label="Share">
                  <FaShare className="w-5 h-5 cursor-pointer" />
                </HoverTooltip>

                <HoverTooltip label="Summarize">
                  <FaMagic className="w-5 h-5 cursor-pointer" />
                </HoverTooltip>
              </div>

              <HoverTooltip label="Read Full">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                </a>
              </HoverTooltip>
            </div>

            <div className="text-sm text-gray-400 mt-2">
              <span>Source: <span className="text-gray-700">{article.source}</span></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* Tooltip Component */
function HoverTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block group">
      <div className="p-2 rounded-full hover:bg-muted transition-colors">
        {children}
      </div>
      <span className="pointer-events-none absolute whitespace-nowrap 
                       -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white 
                       text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100
                       transition-opacity">
        {label}
      </span>
    </div>
  );
}