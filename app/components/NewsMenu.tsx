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
  const [activeTab, setActiveTab] = useState<'categories' | 'publications'>('categories');

  useEffect(() => {
    console.log("Active tab:", activeTab);
  }, [activeTab]);

  useEffect(() => {
  // Flatten the categories arrays and then create a unique set of categories
  const categoriesFromSources = Array.from(new Set(sources.flatMap((source) => source.categories)));
  setUniqueCategories(categoriesFromSources);
  setSelectedCategory(categoriesFromSources[0]); // Select the first category by default
  handleCategoryClick(categoriesFromSources[0]); // Automatically select the first category
  }, [sources]);  

  useEffect(() => {
    if (activeTab === 'publications') {
      // Reset the filteredSources to include all sources when switching to Publications tab
      setSelectedCategory('');
    }
  }, [activeTab, sources]);
  
  const handleTabClick = (tab: 'categories' | 'publications') => {
    setActiveTab(tab);
    if (tab === 'publications') {
      // Reset selectedSource to avoid lingering category-based selection
      if (sources.length > 0) {
        setSelectedSource(sources[0].name);
        onSelect(sources[0].name);
      }
    }
  };
  
  const handleSourceClick = (sourceName: string) => {
    console.log("Publication clicked:", sourceName); 
    const source = sources.find((s) => s.name === sourceName);
    if (source) {
      setSelectedSource(source.name);
      onSelect(source.name);
    }
  };

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category); 
    setSelectedCategory(category);
    onCategorySelect(category);
  
    const sourcesByCategory = sources.filter((source) => source.categories.includes(category));
    if (sourcesByCategory.length > 0) {
      setSelectedSource(sourcesByCategory[0].name);
      onSelect(sourcesByCategory[0].name);
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

          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'publications' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
              onClick={() => handleTabClick('publications')}
            >
              Publications
            </button>
          </div>

          {activeTab === 'categories' && (
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

              {/* Show publications associated with the selected category */}
              {sources.filter((source) => source.categories.includes(selectedCategory)).map((source) => (
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
          )};

          {/* Publications Tab Content */}
          {activeTab === 'publications' && (
            <div>
              <h2 className="text-lg font-bold mb-4">Publications</h2>
              {sources.map((source) => (
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
)}
  
        </div>
      </div>
    );
    
        
}
