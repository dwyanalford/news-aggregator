"use client";

import { useState } from "react";

interface FilterPanelProps {
  totalArticles: number;
  categories: string[];
  publications: string[];
  onFilter: (type: "category" | "publication", value: string) => void;
  onReset: () => void;
}

export default function ArticleFilterPanel({ totalArticles, categories, publications, onFilter, onReset }: FilterPanelProps) {
  // State to track which filter section (category or publication) is currently open
  const [activeFilter, setActiveFilter] = useState<"category" | "publication" | null>(null);

  console.log("Rendering ArticleFilterPanel...");
  console.log("Total Articles:", totalArticles);
  console.log("Categories:", categories);
  console.log("Publications:", publications);

  /**
   * Handles a filter selection (either category or publication)
   * - Calls `onFilter` function passed from `page.tsx`
   * - Logs actions for debugging
   * - Auto-closes sidebar on mobile
   */
  const handleFilterSelection = (type: "category" | "publication", value: string) => {
    console.log(`Filtering by ${type}:`, value);
    onFilter(type, value);

    // Auto-close sidebar on mobile (if width < 1024px)
    if (window.innerWidth < 1024) {
      console.log("Auto-closing sidebar on mobile...");
      document.body.click(); // Simulating sidebar close behavior
    }
  };

  /**
   * Toggles the active filter section (Category or Publication)
   */
  const toggleFilter = (filterType: "category" | "publication") => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
    console.log(`Toggled filter panel: ${filterType}, Now Active:`, activeFilter);
  };

  // Ensure this component renders correctly before returning UI
  console.log("Active Filter Section:", activeFilter);

  return (
    <div className="h-full flex flex-col p-4 bg-gray-100 text-gray-800">
      {/* Sidebar Heading */}
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Latest News Button - Resets Filters */}
      <button 
        onClick={() => {
          console.log("Resetting articles to latest news...");
          onReset();
        }} 
        className="w-full flex items-center justify-between bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
      >
        Latest News
        <span className="bg-white text-blue-500 text-sm font-bold px-2 py-1 rounded-full">{totalArticles}</span>
      </button>

      {/* Filtering Options */}
      <div className="mt-4">
        {/* Category Filter */}
        <button 
          onClick={() => toggleFilter("category")} 
          className="w-full text-center font-semibold py-2 hover:text-blue-500 block"
        >
          Category {activeFilter === "category" ? "▼" : "▶"}
        </button>
        {activeFilter === "category" && (
          <div className="pl-4 flex flex-col space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button 
                  key={category} 
                  onClick={() => handleFilterSelection("category", category)} 
                  className="text-sm text-gray-700 hover:text-blue-500"
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">No categories available</p>
            )}
          </div>
        )}

        {/* Publication Filter */}
        <button 
          onClick={() => toggleFilter("publication")} 
          className="w-full text-center font-semibold py-2 hover:text-blue-500 mt-2 block"
        >
          Publication {activeFilter === "publication" ? "▼" : "▶"}
        </button>
        {activeFilter === "publication" && (
          <div className="pl-4 flex flex-col space-y-2">
            {publications.length > 0 ? (
              publications.map((pub) => (
                <button 
                  key={pub} 
                  onClick={() => handleFilterSelection("publication", pub)} 
                  className="text-sm text-gray-700 hover:text-blue-500"
                >
                  {pub}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">No publications available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}