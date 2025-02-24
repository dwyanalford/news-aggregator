"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DollarSign } from "lucide-react";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

interface Article {
  title: string;
  publication: string;
  image: string;
  author?: string;
}

interface Category {
  id: string;
  name: string;
  articles: Article[];
}

interface NewsSectionProps {
  category: Category;
}

export default function NewsSection({ category }: NewsSectionProps) {
  const mainArticle = category.articles[0];
  const secondaryArticles = category.articles.slice(1);

  // Special handling for Business & Finance section
  if (category.id === 'business') {
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
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              fill
              className="object-cover"
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
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className={`text-green-400 font-bold tracking-wider ${playfair.className}`}>
                  FEATURED IN BUSINESS
                </span>
              </div>
              <h2 className={`text-4xl font-bold text-white mb-4 ${playfair.className}`}>
                {mainArticle.title}
              </h2>
              <p className="text-lg text-white/90 mb-2">
                By John Smith • {mainArticle.publication}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Grid Articles */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen grid grid-cols-2 grid-rows-2 gap-4 p-4">
          {secondaryArticles.slice(0, 4).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg shadow-lg"
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
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className={`text-green-400 text-sm font-semibold ${playfair.className}`}>
                    Business
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-green-400 
                             transition-colors duration-300 line-clamp-2 ${playfair.className}`}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/80">
                  By Sarah Johnson • {article.publication}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // Default layout for other categories
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 h-[50vh] md:h-screen relative"
      >
        <div className="absolute inset-0">
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2">
            {category.name}
          </h3>
          <h2 className="text-xl md:text-4xl font-bold mb-1 md:mb-2">{mainArticle.title}</h2>
          <p className="text-xs md:text-sm opacity-80">{mainArticle.publication}</p>
        </div>
      </motion.div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-screen grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-2 md:gap-4 p-2 md:p-4">
        {secondaryArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div className="relative h-32 md:h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-2 md:p-4 bg-white">
              <h3 className="text-sm md:text-lg font-semibold line-clamp-2 mb-1">
                {article.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">{article.publication}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}