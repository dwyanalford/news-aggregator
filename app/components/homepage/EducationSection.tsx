"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const educationArticles = [
  {
    title: "HBCU Enrollment Sees Historic Surge",
    summary: "Record number of students choose historically Black colleges and universities",
    source: "Education Weekly",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
  },
  {
    title: "New STEM Initiative Launches in Urban Schools",
    summary: "Program aims to increase diversity in technology fields",
    source: "Tech Education Today",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
  },
  {
    title: "Educational Equity Program Expands Nationwide",
    summary: "Federal funding boosts access to quality education",
    source: "Education News",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45"
  },
  {
    title: "Digital Learning Revolution in Communities",
    summary: "Technology bridges educational gaps in underserved areas",
    source: "Digital Learning Report",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
  },
  {
    title: "Scholarship Opportunities Transform Lives",
    summary: "New funding programs open doors for minority students",
    source: "Higher Ed Chronicle",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
  }
];

export default function EducationSection() {
  const mainArticle = educationArticles[0];
  const gridArticles = educationArticles.slice(1);

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
            <span className={`inline-block px-3 py-1 text-sm font-semibold bg-blue-600 text-white rounded-full mb-4 ${playfair.className}`}>
              Featured in Education
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${playfair.className}`}>
              {mainArticle.title}
            </h2>
            <p className="text-lg text-white/90 mb-2">
              {mainArticle.summary}
            </p>
            <p className="text-sm text-white/70">
              {mainArticle.source}
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
              <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${playfair.className}`}>
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {article.summary}
              </p>
              <p className="text-xs text-gray-500">
                {article.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}