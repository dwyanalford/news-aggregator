// app/components/NewsMenu.tsx
"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NewsMenuProps {
  sources: any[];
  onSelect: (sourceName: string) => void;
  onCategorySelect: (category: string) => void;
  isSidebarOpen: boolean; // Sidebar open/close state
  toggleSidebar: () => void; // Function to toggle sidebar
}

export default function NewsMenu({ sources, onSelect, onCategorySelect, isSidebarOpen, toggleSidebar }: NewsMenuProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0]?.name || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get unique categories from sources
    const categoriesFromSources = Array.from(new Set(sources.map((source) => source.category)));
    setUniqueCategories(categoriesFromSources);
    setSelectedCategory(categoriesFromSources[0]); // Select the first category by default
    handleCategoryClick(categoriesFromSources[0]); // Automatically select the first category
  }, [sources]);

  const handleSourceClick = (sourceName: string) => {
    setSelectedSource(sourceName);
    onSelect(sourceName);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  
    const firstSourceInCategory = sources.find((source) => source.category === category);
    if (firstSourceInCategory) {
      setSelectedSource(firstSourceInCategory.name);
      onSelect(firstSourceInCategory.name);
    }
  };

  const filteredSources = selectedCategory
    ? sources.filter((source) => source.category === selectedCategory)
    : sources;

  return (
    <div>
      {/* Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="lg:hidden mb-4 p-2 fixed top-4 left-4 z-50">
          <FontAwesomeIcon icon={faBars} size="lg" /> {/* Open icon */}
        </button>
      )}


      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-64 bg-gray-200 h-screen p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50`}>
        <div className="flex justify-between items-center mb-8">
          <button onClick={toggleSidebar} className="lg:hidden ml-auto">
            <FontAwesomeIcon icon={faTimes} size="lg" /> {/* Close icon */}
          </button>
        </div>


        {/* Category filter in Sidebar */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Publications filter in Sidebar */}
        <div>
          <h2 className="text-lg font-bold mb-4">Publications</h2>
          {filteredSources.map((source) => (
            <button
              key={source.name}
              onClick={() => handleSourceClick(source.name)}
              className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${selectedSource === source.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              <img src={source.logo} alt={source.name} className="w-6 h-6 rounded-lg" />
              <span>{source.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
