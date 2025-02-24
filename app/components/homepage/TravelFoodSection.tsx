"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const travelFoodArticles = [
  {
    title: "Soul Food Renaissance: Traditional Flavors Meet Modern Cuisine",
    summary: "Chefs across America reimagine classic dishes with contemporary twists",
    publication: "Food & Culture Magazine",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },
  {
    title: "Hidden Gems: Black-Owned Restaurants Transform Local Food Scene",
    summary: "Discovering culinary excellence in urban communities",
    publication: "Travel Taste",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b"
  },
  {
    title: "Cultural Tourism: Exploring Heritage Through Travel",
    summary: "New travel routes highlight historical landmarks",
    publication: "Heritage Explorer",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828"
  },
  {
    title: "Food Festivals Celebrate Diverse Culinary Traditions",
    summary: "Annual events showcase regional specialties",
    publication: "Food Network",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
  },
  {
    title: "Travel Guide: Essential Black History Destinations",
    summary: "Must-visit locations for cultural education and reflection",
    publication: "Travel Weekly",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
  }
];

export default function TravelFoodSection() {
  const mainArticle = travelFoodArticles[0];
  const gridArticles = travelFoodArticles.slice(1);

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
            <span className={`inline-block px-3 py-1 text-sm font-semibold bg-orange-600 text-white rounded-full mb-4 ${playfair.className}`}>
              Featured in Travel & Food
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${playfair.className}`}>
              {mainArticle.title}
            </h2>
            <p className="text-lg text-white/90 mb-2">
              {mainArticle.summary}
            </p>
            <p className="text-sm text-white/70">
              {mainArticle.publication}
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
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 group-hover:text-orange-600 transition-colors ${playfair.className}`}>
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
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