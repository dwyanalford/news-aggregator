"use client";

import { motion } from "framer-motion";
import { Music, Film } from "lucide-react";
import { useEffect, useState } from 'react';
import { Article } from "@/app/types";

interface MusicFilmSectionProps {
  articles: Article[];
}


export default function MusicFilmSection( {articles}: MusicFilmSectionProps ) {
  if (!articles || articles.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>No Politics articles available.</p>
      </section>
    );
  }
  
  const [floatingIcons, setFloatingIcons] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    // Initialize floating icons positions
    const icons = Array.from({ length: 20 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100
    }));
    setFloatingIcons(icons);
  }, []);

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#1a1b4b] via-[#2d1b4b] to-[#1b1b3b] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 10%)' }}>
          {floatingIcons.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                opacity: 0.3,
                scale: Math.random() * 0.5 + 0.5,
                x: pos.x,
                y: pos.y
              }}
              animate={{
                y: -100,
                transition: {
                  repeat: Infinity,
                  duration: Math.random() * 10 + 10,
                  ease: "linear",
                  delay: Math.random() * 10
                }
              }}
            >
              {i % 2 === 0 ? (
                <Music className="text-white/10 w-8 h-8" />
              ) : (
                <Film className="text-white/10 w-8 h-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[60vh] relative mb-8 rounded-xl overflow-hidden group"
        >
          <img
            src={articles[0].imageURL || "/images/default.webp"}
            alt={articles[0].title}
            
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              {articles[0].category === "Film" ? (
                <Film className="w-5 h-5 text-purple-400" />
              ) : (
                <Music className="w-5 h-5 text-purple-400" />
              )}
              <span className="text-purple-400 font-semibold">
                {articles[0].category}
              </span>
            </div>
            <h2 className={`text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300`}>
              {articles[0].title}
            </h2>
            <p className="text-lg text-white/90 mb-2">{articles[0].summary}</p>
            <p className="text-sm text-white/70">By {articles[0].author} • {articles[0].source}</p>
          </div>
        </motion.div>

        {/* Grid Articles */}
        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[30vh]">
          {articles.slice(1, 5).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full rounded-lg overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] 
                        transition-shadow duration-300"
            >
              <div className="absolute inset-0">
                <img
                  src={article.imageURL || "/placeholder.png"} // Ensure it uses imageURL
                  alt={article.title}
                  
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 
                              opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              <div className="relative h-full p-4 flex flex-col justify-end transform transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  {article.category === "Film" ? (
                    <Film className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Music className="w-4 h-4 text-purple-400" />
                  )}
                  <span className="text-purple-400 text-sm font-semibold">
                    {article.category}
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-white group-hover:text-purple-300 
                              transition-all duration-300 line-clamp-2`}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  By {article.author} • {article.source} {/* Ensure source is used instead of publication */}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}