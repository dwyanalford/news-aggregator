"use client";

import { FaRegHeart, FaRegBookmark, FaTags, FaShare, FaMagic, FaExternalLinkAlt } from "react-icons/fa";
import HoverTooltip from "./HoverToolTip";

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

  const formatSummary = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text; // If short, return as is
  
    let truncated = text.substring(0, maxLength); // Cut at max length
    let lastPeriod = truncated.lastIndexOf("."); // Find last full stop
  
    if (lastPeriod !== -1) {
      return truncated.substring(0, lastPeriod + 1); // Keep full stop
    } else {
      return truncated.trim() + "..."; // No full stop? Add "..."
    }
  };

  return (
    <div id="articles" className="flex flex-wrap justify-start gap-10 mt-[176px] w-full">
      {articles.map((article) => (
        <div key={article.id} id="articles-wrapper" className="
          flex flex-col rounded-lg

          /* Sizes */
              w-[400px] h-[475px] 
          
          /* Background & Borders */
              bg-gray-100 bg-card border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:border 
              
          /* Shadows */
              shadow-lg hover:shadow-2xl hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] 
              dark:hover:shadow-md dark:hover:shadow-[white]  
              
          /* Hover & Transitions */
              hover:scale-105 transition-all duration-300
            ">
          {/* Image + Main Card Content Wrapper */}
          <div id="article-image" className="h-[250px] w-full overflow-hidden p-1">
            {/* Image Section */}
            <div className="h-full w-full">
              {article.imageURL && (
                <img 
                  src={article.imageURL} 
                  alt={article.title} 
                  className="h-full w-full object-cover hover:scale-105"
                />
              )}
              <div>
                <span>{article.category}</span>
              </div>
            </div>
          </div>

          {/* Main Card Content */}
          <div id="article-content" className="h-[250px] w-full overflow-hidden">
            {/* Article Title */}
            <h2 className="text-xl font-semibold line-clamp-2 flex-grow py-1 px-4 mb-1 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-100 dark:text-white/80 dark:hover:text-white/90">
              {article.title}
            </h2>

            {/* Article Metadata */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1 px-4">
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
                  <span className="text-gray-400 line-clamp-1">{article.author}</span>
                </>
              )}
            </div>

            {/* Article Summary */}
            <p className="text-gray-500 px-4 dark:text-gray-400 line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-100 text-sm min-h-[4.5rem]">
    {formatSummary(article.summary)}
  </p>

            {/* Footer Actions */}
                       <div className="flex items-center justify-between mt-auto p-1 border bg-gray-100 rounded-md 
                         hover:border-gray-300 hover:shadow-lg dark:bg-gray-700 dark:border-gray-600">
                         <div className="flex items-center gap-4">
                           <HoverTooltip label="Like">
                             <FaRegHeart className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400" />
                           </HoverTooltip>
           
                           <HoverTooltip label="Save">
                             <FaRegBookmark className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                           </HoverTooltip>
           
                           <HoverTooltip label="Tag">
                             <FaTags className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400" />
                           </HoverTooltip>
           
                           <HoverTooltip label="Share">
                             <FaShare className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-green-500 dark:group-hover:text-green-400" />
                           </HoverTooltip>
           
                           <HoverTooltip label="Summarize">
                             <FaMagic className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
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
                             <FaExternalLinkAlt className="w-4 h-4 cursor-pointer text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                           </a>
                         </HoverTooltip>
                       </div>
            {/* Source Information */}
            <div className="text-xs text-gray-400 dark:text-gray-300 px-4 pt-2">
              <span>
                Source: <span className="text-gray-700 dark:text-gray-300">{article.source}</span>
              </span>
            </div>
          </div> 
        </div> 
      ))}  
    </div>
  );
}