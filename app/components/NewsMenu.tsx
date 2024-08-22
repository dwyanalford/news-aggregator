// app/components/NewsMenu.tsx
"use client";

import { useState, useEffect } from 'react';

interface NewsMenuProps {
  sources: any[];
  onSelect: (sourceName: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function NewsMenu({ sources, onSelect, onCategorySelect }: NewsMenuProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0]?.name || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get unique categories from sources
    const categoriesFromSources = Array.from(new Set(sources.map((source) => source.category)));
    setUniqueCategories(categoriesFromSources);
    setSelectedCategory(categoriesFromSources[0]); // Select the first category by default
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
      <div className="w-64 text-white p-4 space-y-4">
        <div>
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left py-2 px-4 rounded-lg ${
                selectedCategory === category ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Publications</h2>
          {filteredSources.map((source) => (
            <button
              key={source.name}
              onClick={() => handleSourceClick(source.name)}
              className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${
                selectedSource === source.name ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <img src={source.logo} alt={source.name} className="w-6 h-6 rounded-lg" /> {/* Sidebar logo with smaller size */}
              <span>{source.name}</span>
            </button>
          ))}
        </div>

      </div>
    );
}
