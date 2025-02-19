"use client";

import { useState } from "react";

interface FilterPanelProps {
  totalArticles: number;                  // Total count of all articles (static)
  categories: string[];
  publications: string[];
  publicationCounts: { [key: string]: number }; // Already-fetched counts per publication
  onFilter: (type: "category" | "publication", value: string) => void;
  onReset: () => void;
}

export default function ArticleFilterPanel({
  totalArticles,
  categories,
  publications,
  publicationCounts,
  onFilter,
  onReset,
}: FilterPanelProps) {
  console.log("Rendering ArticleFilterPanel...");

  // Tracks which filter section is open ("category" or "publication")
  const [activeFilter, setActiveFilter] = useState<"category" | "publication" | null>(null);

  // Toggles visibility of category or publication dropdown
  const toggleFilter = (filterType: "category" | "publication") => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
    console.log(`Toggled filter: ${filterType} | Currently Active:`, activeFilter);
  };

  // Handles user selection of a filter option
  const handleFilterSelection = (type: "category" | "publication", value: string) => {
    console.log(`User selected ${type}: ${value}`);
    onFilter(type, value);

    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      document.body.click();
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Sidebar Title */}
      <h2 className="text-lg font-bold mb-4 dark:text-white">Filters</h2>

      {/* Latest News Button - Resets all filters */}
      <button
        onClick={() => {
          console.log("Resetting filters - Showing latest news articles...");
          onReset();
        }}
        className="flex items-center justify-between button-active w-[200px] hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Latest Articles
        {/* The static totalArticles count */}
        <span className="bg-white text-blue-500 text-sm font-bold px-2 py-1 rounded-full dark:bg-gray-800 dark:text-white">
          {totalArticles}
        </span>
      </button>

      {/* Filter Options Section */}
      <div className="mt-4">
        {/* Category Filter Toggle */}
        <button
          onClick={() => toggleFilter("category")}
          className="w-full text-left font-semibold py-2 hover:text-blue-500 dark:hover:text-blue-400"
        >
          Category {activeFilter === "category" ? "▼" : "▶"}
        </button>

        {/* Category Dropdown */}
        {activeFilter === "category" && (
          <div className="pl-4 flex flex-col space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterSelection("category", category)}
                  className="text-sm text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No categories available</p>
            )}
          </div>
        )}

        {/* Publication Filter Toggle */}
        <button
          onClick={() => toggleFilter("publication")}
          className="w-full text-left font-semibold py-2 hover:text-blue-500 dark:hover:text-blue-400 mt-2"
        >
          Publication {activeFilter === "publication" ? "▼" : "▶"}
        </button>

        {/* Publication Dropdown */}
        {activeFilter === "publication" && (
          <div className="pl-4 flex flex-col space-y-2 bg-green">
            {publications.length > 0 ? (
              publications
                .sort()
                .map((pub) => (
                  <button
                    key={pub}
                    onClick={() => handleFilterSelection("publication", pub)}
                    className="text-sm text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-left"
                  >
                    {pub}
                    {/* Display the static publication count in parentheses */}
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                      ({publicationCounts[pub] || 0})
                    </span>
                  </button>
                ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No publications available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}