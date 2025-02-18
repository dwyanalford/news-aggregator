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
  console.log("Rendering ArticleFilterPanel...");

  // State to track which filter section (category or publication) is currently open
  const [activeFilter, setActiveFilter] = useState<"category" | "publication" | null>(null);

  console.log("Total Articles Available:", totalArticles);
  console.log("Available Categories:", categories);
  console.log("Available Publications:", publications);

  /**
   * Handles user selection of a filter (Category or Publication)
   */
  const handleFilterSelection = async (type: "category" | "publication", value: string) => {
    console.log(`User selected ${type}: ${value}`);
    onFilter(type, value);
  
    // Fetch publication data (logo and purpose)
    if (type === "publication") {
      try {
        const response = await fetch(`/api/rss?publication=${value}`);
        const data = await response.json();
  
        if (data.success) {
          // Pass the logo and purpose to the parent or ArticleHeader component
          onPublicationSelect(data.data); // You will need to define this function
        } else {
          console.error("Failed to fetch publication data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching publication data:", error);
      }
    }
  
    // Auto-close sidebar on mobile (if width < 1024px)
    if (window.innerWidth < 1024) {
      document.body.click(); // Simulating sidebar close behavior
    }
  };

  /**
   * Toggles the visibility of the selected filter section
   */
  const toggleFilter = (filterType: "category" | "publication") => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
    console.log(`Toggled filter: ${filterType} | Currently Active:`, activeFilter);
  };

  console.log("Currently Active Filter Section:", activeFilter);

  return (
    <div className="h-full flex flex-col p-4 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Sidebar Title */}
      <h2 className="text-lg font-bold mb-4 dark:text-white">Filters</h2>

      {/* Latest News Button - Resets all filters */}
      <button 
        onClick={() => {
          console.log("Resetting filters - Showing latest news articles...");
          onReset();
        }} 
        className="w-full flex items-center justify-between bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Latest News
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

        {/* Category Options (Dropdown) */}
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

        {/* Publication Options (Dropdown) */}
        {activeFilter === "publication" && (
          <div className="pl-4 flex flex-col space-y-2">
            {publications.length > 0 ? (
              publications.map((pub) => (
                <button 
                  key={pub} 
                  onClick={() => handleFilterSelection("publication", pub)} 
                  className="text-sm text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-left"
                >
                  {pub}
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

function onPublicationSelect(data: any) {
  throw new Error("Function not implemented.");
}
