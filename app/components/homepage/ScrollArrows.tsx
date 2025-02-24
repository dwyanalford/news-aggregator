"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollArrowsProps {
  activeSection: number;
  totalSections: number;
  onScrollUp: () => void;
  onScrollDown: () => void;
}

export default function ScrollArrows({
  activeSection,
  totalSections,
  onScrollUp,
  onScrollDown,
}: ScrollArrowsProps) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 space-y-2 md:space-y-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onScrollUp}
        disabled={activeSection === 0}
        className={`p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300
                   ${
                     activeSection === 0
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:bg-white hover:shadow-xl"
                   }`}
        title="Scroll Up"
      >
        <ChevronUp className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-300
                             ${activeSection === 0 ? "text-gray-400" : "text-gray-800"}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onScrollDown}
        disabled={activeSection === totalSections - 1}
        className={`p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300
                   ${
                     activeSection === totalSections - 1
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:bg-white hover:shadow-xl"
                   }`}
        title={activeSection === totalSections - 2 ? "Go to Bottom" : "Scroll Down"}
      >
        <ChevronDown className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-300
                               ${activeSection === totalSections - 1 ? "text-gray-400" : "text-gray-800"}`} />
      </motion.button>
    </div>
  );
}