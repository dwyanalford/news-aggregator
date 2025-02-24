"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

interface NewHeroSectionProps {
  onExplore: () => void;
}

export default function NewHeroSection({ onExplore }: NewHeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516733725897-4615ac98d9ca"
          alt="Black family walking together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 whitespace-nowrap"
          >
            Stay Informed. Stay Empowered.
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-2 mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-200">
              Bringing you the latest news stories
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              focused on the Black American experience
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplore}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                     text-white font-semibold py-3 px-6 rounded-full text-lg md:text-xl
                     transition-all duration-300 transform hover:shadow-lg"
          >
            Explore the Latest Stories
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}