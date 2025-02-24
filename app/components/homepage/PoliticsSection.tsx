"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

interface Article {
  title: string;
  summary: string;
  publication: string;
  image: string;
}

interface PoliticsSectionProps {
  articles: Article[];
}

export default function PoliticsSection({ articles }: PoliticsSectionProps) {
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1);

  return (
    <section className="h-screen flex flex-col">
      {/* Top Section - Featured Article */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[60vh] w-full"
      >
        <div className="absolute inset-0">
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <span className={`inline-block px-3 py-1 text-sm font-semibold bg-red-600 text-white rounded-full ${playfair.className}`}>
              Breaking News
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${playfair.className}`}>
              {mainArticle.title}
            </h2>
            <p className="text-lg text-white/90 line-clamp-2">
              {mainArticle.summary}
            </p>
            <p className="text-sm text-white/70">
              {mainArticle.publication}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Section - Grid Articles */}
      <div className="h-[40vh] grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50">
        {secondaryArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden 
                     transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="relative h-32">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 transition-transform duration-300 
                           group-hover:-translate-y-1 line-clamp-2 ${playfair.className}`}>
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {article.summary}
              </p>
              <p className="text-xs text-gray-500">
                {article.publication}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}