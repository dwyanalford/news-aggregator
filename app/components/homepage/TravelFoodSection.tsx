"use client";

import { motion } from "framer-motion";
import { Article } from "@/app/types";

interface TravelFoodSectionProps {
  articles: Article[];
}

export default function TravelFoodSection( {articles}: TravelFoodSectionProps) {
  if (!articles || articles.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>No Politics articles available.</p>
      </section>
    );
  }
  
  const mainArticle = articles[0];
  const gridArticles = articles.slice(1, 5);

  return (
    <section className="h-screen flex flex-row-reverse">
      {/* Right Side - Featured Article */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 h-screen relative"
      >
        <div className="absolute inset-0">
          <img
            src={mainArticle.imageURL || "/images/default.webp"}
            alt={mainArticle.title}
            className="object-cover w-full h-full"
            
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`inline-block px-3 py-1 text-sm font-semibold bg-orange-600 text-white rounded-full mb-4`}>
              Featured in Travel & Food
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4`}>
              {mainArticle.title}
            </h2>
            <p className="text-lg text-white/90 mb-2">
              {mainArticle.summary}
            </p>
            <p className="text-sm text-white/70">
              {mainArticle.source}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Left Side - Grid Articles */}
      <div className="w-full md:w-1/2 h-screen grid grid-cols-2 grid-rows-2 gap-4 p-4 bg-gray-50">
        {gridArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-40">
              <img
                src={article.imageURL || "/images/default.webp"}
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 group-hover:text-orange-600 transition-colors`}>
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {article.summary}
              </p>
              <p className="text-xs text-gray-500">
                {article.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}