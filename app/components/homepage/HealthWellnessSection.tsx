"use client";

import { motion } from "framer-motion";
import { Heart, Leaf } from "lucide-react";
import { Article } from "@/app/types";

interface HealthWellnessSectionProps {
  articles: Article[];
}


export default function HealthWellnessSection({ articles }: HealthWellnessSectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        {/* Top Featured Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {articles.slice(0, 2).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-[500px] group rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={articles[0].imageURL || "/images/default.webp"}
                alt={articles[0].title}
                
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-4">
                  {index === 0 ? (
                    <Heart className="w-6 h-6 text-green-400" />
                  ) : (
                    <Leaf className="w-6 h-6 text-green-400" />
                  )}
                  <span className={`text-green-400 font-bold tracking-wider`}>
                    FEATURED
                  </span>
                </div>
                <h2 className={`text-3xl font-bold text-white mb-3 group-hover:text-green-300 
                             transition-colors duration-300`}>
                  {article.title}
                </h2>
                <p className="text-lg text-white/90 mb-3">{article.summary}</p>
                <p className="text-sm text-white/70">
                  By {article.author} • {article.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(2).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-[400px] group rounded-xl overflow-hidden shadow-lg 
                       hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={article.imageURL || "/images/default.webp"}
                alt={article.title}
                
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-green-400" />
                  <span className={`text-green-400 text-sm font-bold tracking-wider`}>
                    WELLNESS
                  </span>
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-green-300 
                             transition-colors duration-300`}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/90 mb-2">{article.summary}</p>
                <p className="text-xs text-white/70">
                  By {article.author} • {article.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}