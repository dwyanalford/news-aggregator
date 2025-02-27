"use client";

import { motion } from "framer-motion";
import { Article } from "@/app/types";

interface FashionSectionProps {
  articles: Article[];
}

export default function FashionSection( {articles}: FashionSectionProps) {
  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative h-[50vh] md:h-full"
          >
            <img
              src={article.imageURL || "/images/default.webp"}
              alt={article.title}
              
              className="object-cover w-full h-full"
              
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
              <span className="bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold mb-2 md:mb-4 inline-block">
                Latest in Fashion
              </span>
              <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-3">{article.title}</h2>
              <p className="text-sm md:text-lg mb-1 md:mb-2 opacity-90 line-clamp-2 md:line-clamp-none">{article.summary}</p>
              <p className="text-xs md:text-sm opacity-75">{article.source}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}