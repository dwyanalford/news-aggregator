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
      className="articles-container flex flex-wrap gap-4 justify-center mt-3"
    >
      {articles.map((article: Article, i) => (
        <motion.div
          key={article.id}
          className="article-container h-[300px] w-[430px] flex flex-col justify-between bg-cover bg-center relative rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${article.imageURL})` }}
          initial={{ opacity: 0, y: 20 }}  // Less movement for a quicker feel
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}  // ⬅ Shorter duration & less delay
          viewport={{ once: true, amount: 0.1 }}  // Prevents re-animation when scrolling back up

        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-lg shadow-lg transition-opacity duration-500 hover:bg-black/20"></div>

          <div className="article-text absolute inset-0 flex flex-col justify-between z-10 p-2 text-gray-200">
            <p className="article-category flex text-xs justify-end pt-3 pr-3">{article.category}</p>
            <div className="flex flex-col p-2">
              <div className="flex mb-0">
                <p className="article-date text-xs w-1/2">{new Date(article.date).toLocaleDateString("en-US")}</p>
              </div>
              <h2 className="article-title leading-tight line-clamp-3 overflow-hidden text-lg shadow-xl">
                {article.title}
              </h2>
              <div className="flex">
                <p className="article-source w-4/5 text-xs">Source: {article.source}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-readmore w-1/5 text-sm"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
    
  );
}
