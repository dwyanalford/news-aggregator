"use client";

import { motion } from "framer-motion";
import { Article } from "@/app/types";

interface PopCultureSectionProps {
  articles: Article[];
}

export default function PopCultureSection({ articles }: PopCultureSectionProps) {
  if (!articles || articles.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>No Politics articles available.</p>
      </section>
    );
  }
  
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="h-screen flex flex-col md:flex-row">
      {/* Left Column - Side Articles */}
      <div className="w-full md:w-[40%] h-full grid grid-rows-4 gap-2 p-2 bg-gray-50">
        {sideArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative h-full">
              <div className="absolute inset-0">
                <img
                  src={article.imageURL || "/images/default.webp"}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-800 mb-2`}>
                  {article.category}
                </span>
                <h3 className={`text-lg font-semibold text-white line-clamp-2 mb-1`}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/80">
                  By {article.author} • {article.source}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Column - Featured Article */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full md:w-[60%] h-full"
      >
        <div className="absolute inset-0">
          <img
            src={featuredArticle.imageURL || "/images/default.webp"}
            alt={featuredArticle.title}
            className="object-cover w-full h-full"
            
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-8 w-full text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-white/90 text-gray-800 mb-4`}>
              {featuredArticle.category}
            </span>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight`}>
              {featuredArticle.title}
            </h2>
            <p className="text-lg text-white/90 mb-2">
              By {featuredArticle.author}
            </p>
            <p className="text-sm text-white/70">
              {featuredArticle.source}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}