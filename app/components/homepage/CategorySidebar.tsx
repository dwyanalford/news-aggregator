"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Icons;
  articles?: any[];
}

interface CategorySidebarProps {
  categories: Category[];
  activeSection: number;
  onCategoryClick: (index: number) => void;
}

export default function CategorySidebar({
  categories,
  activeSection,
  onCategoryClick,
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Collapsed Tab */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm 
                     border-r border-gray-200 py-4 px-2 z-50 rounded-r-lg shadow-lg
                     hover:bg-white/90 transition-colors duration-200"
            aria-label="Open Menu"
          >
            <Icons.Menu className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-[25%] inset-y-0 flex flex-col justify-center max-h-fit items-center bg-white/80 backdrop-blur-sm 
                     border-r border-gray-200 py-8 px-2 md:px-4 z-50 shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-2 p-1 rounded-full hover:bg-gray-100
                       transition-colors duration-200"
              aria-label="Close Menu"
            >
              <Icons.X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Categories List */}
            <ul className="space-y-4 md:space-y-6 mt-4 max-h-[80vh] overflow-y-auto py-4
                        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {categories.map((category, index) => {
                const Icon = Icons[category.icon];
                return (
                  <motion.li
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => onCategoryClick(index)}
                      className={`flex items-center space-x-1 md:space-x-2 text-xs md:text-sm 
                                transition-all group whitespace-nowrap
                                ${
                                  activeSection === index
                                    ? "text-primary font-bold scale-105 transform"
                                    : "text-gray-600 hover:text-primary"
                                }`}
                    >
                      <Icon className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                      <span className="hidden md:inline">{category.name}</span>
                      <span className="md:hidden">{category.name.split(' ')[0]}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}