"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const quotes = [
  {
    name: "Martin Luther King Jr.",
    quote: "The time is always right to do what is right.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    name: "Maya Angelou",
    quote: "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Frederick Douglass",
    quote: "If there is no struggle, there is no progress.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Rosa Parks",
    quote: "I have learned over the years that when one's mind is made up, this diminishes fear.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    name: "Barack Obama",
    quote: "The future rewards those who press on.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  }
];

export default function QuotesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getQuoteDuration = (text: string) => {
      return Math.max(5000, text.length * 50);
    };

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, getQuoteDuration(quotes[currentIndex].quote));

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const variants = {
    enter: {
      opacity: 0,
      filter: "blur(20px)",
    },
    center: {
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      filter: "blur(20px)",
    },
  };

  return (
    <section className="relative h-[50vh] bg-gradient-to-br from-[#1a2942] to-[#2c3e50]">
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              filter: { duration: 1, ease: "easeInOut" },
            }}
            className="w-full max-w-5xl mx-auto text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={quotes[currentIndex].image}
                  alt={quotes[currentIndex].name}
                  fill
                  className="rounded-full object-cover border-2 border-white/30"
                />
              </div>
              
              <div className={`relative max-w-4xl mx-auto mb-4 ${playfair.className}`}>
                <span className="absolute -left-2 md:-left-4 top-0 text-white/10 text-5xl md:text-6xl">"</span>
                <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed tracking-wide px-6 md:px-12"
                   style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                  {quotes[currentIndex].quote}
                </p>
                <span className="absolute -right-2 md:-right-4 bottom-0 text-white/10 text-5xl md:text-6xl">"</span>
              </div>

              <p className="text-sm md:text-base text-white/70 font-light tracking-wider">
                {quotes[currentIndex].name}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}