"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Article } from "@/app/types";

interface PoliticsSectionProps {
  articles: Article[];
}

export default function PoliticsSection({ articles }: PoliticsSectionProps) {
  if (!articles || articles.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>No Politics articles available.</p>
      </section>
    );
  }

  const mainArticle = articles[0]; // First article as the main article
  const secondaryArticles = articles.slice(1, 5); // Next 4 articles for the grid

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Featured Article */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 h-[50vh] md:h-screen relative"
      >
        <div className="absolute inset-0">
          <img
            src={mainArticle.imageURL || "/images/default.webp"}
            alt={mainArticle.title || "No image available"}
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
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold tracking-wider">
                FEATURED IN POLITICS
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {mainArticle.title}
            </h2>
            <p className="text-lg text-white/90 mb-2">
              By {mainArticle.author} • {mainArticle.source}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Grid Articles */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen grid grid-cols-2 grid-rows-2 gap-4 p-4">
        {secondaryArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <div className="absolute inset-0">
              <img
                src={article.imageURL || "/images/default.webp"}
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 
                              opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            </div>
            <div className="relative h-full p-4 flex flex-col justify-end transform transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">
                  Politics
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 
                             transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-white/80">
                By {article.author} • {article.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
