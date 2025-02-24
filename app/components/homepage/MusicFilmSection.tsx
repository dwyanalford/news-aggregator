"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Music, Film } from "lucide-react";
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const musicFilmArticles = [
  {
    title: "Black Cinema Renaissance: New Wave of Storytellers",
    summary: "Emerging directors reshape the film industry with authentic narratives",
    publication: "Film Quarterly",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    category: "Film",
    author: "Marcus Thompson"
  },
  {
    title: "Hip-Hop's Global Impact Reaches New Heights",
    summary: "Genre continues to influence culture and social movements worldwide",
    publication: "Rolling Stone",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    category: "Music",
    author: "Sarah Williams"
  },
  {
    title: "Indie Film Movement Gains Momentum",
    summary: "Independent filmmakers break barriers with innovative storytelling",
    publication: "Variety",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    category: "Film",
    author: "David Chen"
  },
  {
    title: "R&B Evolution: New Sound, Classic Soul",
    summary: "Artists blend traditional elements with modern production",
    publication: "Billboard",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    category: "Music",
    author: "Maya Johnson"
  },
  {
    title: "Documentary Series Highlights Musical Pioneers",
    summary: "Groundbreaking series explores the roots of Black music",
    publication: "Entertainment Weekly",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    category: "Both",
    author: "James Wilson"
  }
];

export default function MusicFilmSection() {
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
          <Image
            src={musicFilmArticles[0].image}
            alt={musicFilmArticles[0].title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              {musicFilmArticles[0].category === "Film" ? (
                <Film className="w-5 h-5 text-purple-400" />
              ) : (
                <Music className="w-5 h-5 text-purple-400" />
              )}
              <span className="text-purple-400 font-semibold">
                {musicFilmArticles[0].category}
              </span>
            </div>
            <h2 className={`text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300 ${inter.className}`}>
              {musicFilmArticles[0].title}
            </h2>
            <p className="text-lg text-white/90 mb-2">{musicFilmArticles[0].summary}</p>
            <p className="text-sm text-white/70">By {musicFilmArticles[0].author} • {musicFilmArticles[0].publication}</p>
          </div>
        </motion.div>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[30vh]">
          {musicFilmArticles.slice(1).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full rounded-lg overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] 
                       transition-shadow duration-300"
            >
              <div className="absolute inset-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                             transition-all duration-300 line-clamp-2 ${inter.className}`}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  By {article.author} • {article.publication}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}