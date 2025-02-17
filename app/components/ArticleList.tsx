"use client";

import { FaRegHeart, FaRegBookmark, FaTags, FaShare, FaMagic, FaExternalLinkAlt } from "react-icons/fa";

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
  console.log("Rendering ArticleList Component...");
  console.log("Total Articles:", articles.length);

  if (articles.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400">No articles available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {articles.map((article) => (
        <div
          key={article.id}
          className="
            /* Sizing */
            w-[400px] h-[475px] 

            /* Layout & Flexbox */
            flex flex-col group 

            /* Background & Borders */
            bg-gray-100 bg-card border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:border 

            /* Overflow & Rounded Corners */
            overflow-hidden rounded-lg 

            /* Shadows */
            shadow-lg hover:shadow-2xl hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] 
            dark:hover:shadow-md dark:hover:shadow-[white]

            /* Spacing for Large Screens */
            lg:mr-7 lg:mb-7 

            /* Hover & Transitions */
            hover:scale-105 transition-all duration-300
          "
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
            {/* Article Title */}
            <h2 className="text-xl font-semibold mb-3 line-clamp-2 flex-grow text-gray-900 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-100">
              {article.title}
            </h2>

            {/* Article Metadata */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "2-digit",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
              {article.author && (
                <>
                  <span>•</span>
                  <span className="text-gray-400">{article.author}</span>
                </>
              )}
            </div>

            {/* Article Summary */}
            <p className="text-gray-500 dark:text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-100">
              {article.summary}
            </p>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-auto p-2 border bg-gray-100 rounded-md 
              hover:border-gray-300 hover:shadow-lg dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center gap-4">
                <HoverTooltip label="Like">
                  <FaRegHeart className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400" />
                </HoverTooltip>

                <HoverTooltip label="Save">
                  <FaRegBookmark className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                </HoverTooltip>

                <HoverTooltip label="Tag">
                  <FaTags className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400" />
                </HoverTooltip>

                <HoverTooltip label="Share">
                  <FaShare className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-green-500 dark:group-hover:text-green-400" />
                </HoverTooltip>

                <HoverTooltip label="Summarize">
                  <FaMagic className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                </HoverTooltip>
              </div>

              {/* Read Full Article */}
              <HoverTooltip label="Read Full">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <FaExternalLinkAlt className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                </a>
              </HoverTooltip>
            </div>

            {/* Source Information */}
            <div className="text-sm text-gray-400 dark:text-gray-300 mt-2">
              <span>
                Source: <span className="text-gray-700 dark:text-gray-200">{article.source}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Tooltip Component */
function HoverTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative inline-block hover-trigger">
      <div className="p-2 rounded-full hover:bg-muted transition-colors">
        {children}
      </div>
      <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2
  bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-md
  opacity-0 scale-95 transition-all duration-200 pointer-events-none">
  {label}
</span>
    </div>
  );
}
