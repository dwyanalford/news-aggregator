"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const publications = [
  "The New York Times",
  "Washington Post",
  "The Atlantic",
  "Essence",
  "Black Enterprise",
  "The Root",
  "Ebony",
  "Forbes",
  "Bloomberg",
  "NPR",
];

export default function PublicationTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-white py-4 md:py-8 shadow-inner"
    >
      <motion.div
        animate={{
          x: isPaused ? 0 : "-100%",
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap"
      >
        {[...publications, ...publications].map((pub, index) => (
          <div
            key={index}
            className="mx-4 md:mx-8 text-base md:text-xl font-semibold text-gray-800 flex items-center"
          >
            <span className="mx-2 md:mx-4 text-gray-300">•</span>
            {pub}
          </div>
        ))}
      </motion.div>
    </div>
  );
}