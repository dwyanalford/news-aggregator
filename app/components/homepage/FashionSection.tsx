"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fashionNews = [
  {
    title: "Sustainable Fashion Takes Center Stage in Urban Design",
    summary: "Leading designers embrace eco-friendly materials and ethical production.",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    source: "Vogue"
  },
  {
    title: "Emerging Designers Redefine Contemporary Style",
    summary: "New wave of talent brings fresh perspective to modern fashion.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    source: "Fashion Weekly"
  }
];

export default function FashionSection() {
  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        {fashionNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative h-[50vh] md:h-full"
          >
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
              <span className="bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold mb-2 md:mb-4 inline-block">
                Latest in Fashion
              </span>
              <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-3">{news.title}</h2>
              <p className="text-sm md:text-lg mb-1 md:mb-2 opacity-90 line-clamp-2 md:line-clamp-none">{news.summary}</p>
              <p className="text-xs md:text-sm opacity-75">{news.source}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}