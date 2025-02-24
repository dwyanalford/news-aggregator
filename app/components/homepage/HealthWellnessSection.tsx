"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Leaf } from "lucide-react";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const healthArticles = [
  {
    title: "Mindfulness and Mental Health: A Holistic Approach",
    summary: "Exploring the intersection of mental wellness and daily practices",
    author: "Dr. Sarah Johnson",
    source: "Wellness Today",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
  },
  {
    title: "Plant-Based Living: Benefits for Body and Planet",
    summary: "How sustainable eating habits improve health outcomes",
    author: "Michael Chen",
    source: "Health & Nature",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    title: "Exercise Revolution: Community Fitness Programs",
    summary: "Innovative approaches to inclusive physical wellness",
    author: "Lisa Williams",
    source: "Fitness Journal",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
  },
  {
    title: "Sleep Science: The Key to Better Health",
    summary: "Latest research on rest and recovery",
    author: "Dr. James Martinez",
    source: "Sleep Research Weekly",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55"
  },
  {
    title: "Wellness Tech: Digital Tools for Health",
    summary: "Technology's role in personal health management",
    author: "Rachel Thompson",
    source: "Tech Health Review",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c"
  }
];

export default function HealthWellnessSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        {/* Top Featured Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {healthArticles.slice(0, 2).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-[500px] group rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-4">
                  {index === 0 ? (
                    <Heart className="w-6 h-6 text-green-400" />
                  ) : (
                    <Leaf className="w-6 h-6 text-green-400" />
                  )}
                  <span className={`text-green-400 font-bold tracking-wider ${playfair.className}`}>
                    FEATURED
                  </span>
                </div>
                <h2 className={`text-3xl font-bold text-white mb-3 group-hover:text-green-300 
                             transition-colors duration-300 ${playfair.className}`}>
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
          {healthArticles.slice(2).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-[400px] group rounded-xl overflow-hidden shadow-lg 
                       hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-green-400" />
                  <span className={`text-green-400 text-sm font-bold tracking-wider ${playfair.className}`}>
                    WELLNESS
                  </span>
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-green-300 
                             transition-colors duration-300 ${playfair.className}`}>
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