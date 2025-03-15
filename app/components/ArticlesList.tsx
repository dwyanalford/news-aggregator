// app/components/ArticlesList.tsx (Client Component)

"use client";

import { Article } from "@/app/types";
import { motion } from "framer-motion";

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="articles-container flex flex-wrap gap-6 justify-center mt-3"
    >
      {articles.map((article: Article, i) => (
        <motion.div
          key={article.id}
          className="article-container h-[320px] w-[430px] flex flex-col justify-between bg-cover bg-center relative rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${article.imageURL})` }}
          initial={{ opacity: 0, y: 20 }}  // Less movement for a quicker feel
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}  // ⬅ Shorter duration & less delay
          viewport={{ once: true, amount: 0.1 }}  // Prevents re-animation when scrolling back up

        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-lg shadow-lg transition-opacity duration-500 hover:bg-black/30"></div>

          <div className="flex flex-col h-full z-10 p-2 text-gray-200">
            {/* Category stays at the top */}
            <div className="flex flex-row justify-between items-center w-full">
              <span
                id={`article-category-${article.id}`}
                className="px-2 py-1 rounded-lg bg-slate-200/80 text-slate-800 text-xs"
              >
                {article.category}
              </span>
              <p className="text-xs text-right">
                {article.source}
              </p>
            </div>

            {/* Spacer to push the date & source down */}
            <div className="flex-grow"></div>

            {/* Date & Source - Now directly above the title */}
            <div className="flex items-center text-xs mt-auto space-x-2">
              <span
                id={`article-date-${article.id}`}
                className="text-gray-300 px-2 py-1 rounded-full text-shadow-sm"
              >
                {new Date(article.date).toLocaleDateString("en-US")}
              </span>
            </div>

            {/* Clickable Title - Stays at the very bottom */}
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-black/30 p-2 rounded-lg"
            >
              <h2 className="article-title leading-tight line-clamp-3 overflow-hidden text-lg text-shadow-md mb-0">
                {article.title}
              </h2>
            </a>
          </div>
        </motion.div>
      ))}
    </motion.div>
    
  );
}