"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Atom, Microscope, Globe, Wifi } from "lucide-react";
import { Space_Grotesk } from 'next/font/google';
import { useEffect, useState } from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const scienceTechArticles = [
  {
    title: "AI Innovation: Breaking New Ground in Machine Learning",
    summary: "Revolutionary algorithms reshape the future of artificial intelligence",
    publication: "MIT Technology Review",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    category: "Technology"
  },
  {
    title: "Quantum Computing Breakthrough by Research Team",
    summary: "New quantum processor achieves unprecedented stability",
    publication: "Scientific American",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    category: "Science"
  },
  {
    title: "Green Tech Solutions for Sustainable Future",
    summary: "Innovative approaches to environmental challenges",
    publication: "Nature",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    category: "Environment"
  },
  {
    title: "Medical Tech Advances in Disease Prevention",
    summary: "AI-powered diagnostics revolutionize healthcare",
    publication: "Science Daily",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
    category: "Healthcare"
  },
  {
    title: "Space Exploration: New Frontiers in Technology",
    summary: "Latest developments in space research and innovation",
    publication: "Space.com",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    category: "Space"
  }
];

const BackgroundGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div className="relative w-full h-full">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute w-full border-t border-blue-500/20" style={{ top: `${i * 5}%` }} />
      ))}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute h-full border-l border-blue-500/20" style={{ left: `${i * 5}%` }} />
      ))}
    </div>
  </div>
);

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    // Initialize particles only on the client side
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0.2,
            scale: 0.5,
            x: particle.x,
            y: particle.y
          }}
          animate={{
            y: [particle.y, particle.y - 200],
            x: [particle.x, particle.x + (Math.random() > 0.5 ? 100 : -100)],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {i % 4 === 0 ? (
            <Atom className="text-blue-400/20 w-4 h-4" />
          ) : i % 4 === 1 ? (
            <Cpu className="text-blue-400/20 w-4 h-4" />
          ) : i % 4 === 2 ? (
            <Globe className="text-blue-400/20 w-4 h-4" />
          ) : (
            <Wifi className="text-blue-400/20 w-4 h-4" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function ScienceTechSection() {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] overflow-hidden">
      <BackgroundGrid />
      <FloatingParticles />

      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-12 gap-8 h-[80vh]">
          {/* Featured Article - Diagonal Split */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-span-7 relative group h-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)"
            }}
          >
            <div className="relative h-full rounded-lg overflow-hidden border border-blue-400/20">
              <Image
                src={scienceTechArticles[0].image}
                alt={scienceTechArticles[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-6 h-6 text-blue-400" />
                    <span className={`text-blue-400 font-bold tracking-wider ${spaceGrotesk.className}`}>
                      FEATURED IN TECH
                    </span>
                  </div>
                  <h2 className={`text-4xl font-bold text-white mb-4 group-hover:text-blue-400 
                               transition-colors duration-300 ${spaceGrotesk.className}`}>
                    {scienceTechArticles[0].title}
                  </h2>
                  <p className="text-lg text-white/90 mb-2">{scienceTechArticles[0].summary}</p>
                  <p className="text-sm text-white/70">{scienceTechArticles[0].publication}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Side Articles - Vertical Stack */}
          <div className="col-span-12 md:col-span-5 grid grid-rows-4 gap-4">
            {scienceTechArticles.slice(1).map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-lg overflow-hidden border border-blue-400/20
                         hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="relative h-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <Microscope className="w-4 h-4 text-blue-400" />
                      <span className={`text-blue-400 text-sm font-bold tracking-wider ${spaceGrotesk.className}`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold text-white group-hover:text-blue-400 
                                transition-all duration-300 ${spaceGrotesk.className}`}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/70 mt-2 line-clamp-2">{article.summary}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}