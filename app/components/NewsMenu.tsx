// app/components/NewsMenu.tsx
"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faNewspaper, faTag } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode, faBriefcase, faHeartbeat, faFilm, faFootballBall, faFlask, faGraduationCap, faPlane, faDollarSign, faUtensils, faVenus, faBalanceScale, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

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
  
    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'Technology':
          return faLaptopCode;
        case 'Business':
          return faBriefcase;
        case 'Health':
          return faHeartbeat;
        case 'Entertainment':
          return faFilm;
        case 'Sports':
          return faFootballBall;
        case 'Science':
          return faFlask;
        case 'Education':
          return faGraduationCap;
        case 'Travel':
          return faPlane;
        case 'Finance':
          return faDollarSign;
        case 'Food':
          return faUtensils;
        case 'Black Women':
          return faVenus;
          case 'Culture':
          return faTheaterMasks;
        case 'Politics':
          return faBalanceScale;
        default:
          return faTag; // Fallback icon
      }
    };

    return (
      <div>
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <button onClick={toggleSidebar} className="lg:hidden mb-4 p-2 fixed top-4 left-4 z-50">
            <FontAwesomeIcon icon={faBars} size="lg" /> {/* Open icon */}
          </button>
        )}
    
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 w-72 bg-gray-200 h-screen p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50 overflow-y-auto overflow-x-hidden`}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={toggleSidebar} className="lg:hidden ml-auto">
              <FontAwesomeIcon icon={faTimes} size="lg" /> {/* Close icon */}
            </button>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              className={`px-2 py-2 ${activeTab === 'categories' ? 'button-active' : 'button-inactive'} `}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button
              className={`px-2 py-2 ${activeTab === 'publications' ? 'button-active' : 'button-inactive'} `}
              onClick={() => handleTabClick('publications')}
            >
              Publications
            </button>
          </div>

          {activeTab === 'categories' && (
            <div className="mb-8">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`py-2 px-4 rounded-lg flex items-center ${selectedCategory === category ? 'button-active' : ''}`}
                >
                  {/* Used a table to how more control in lining up categories and icons */}
                  <div className="table w-full">
                    <div className="table-row">
                      <div className="table-cell align-middle w-8"> {/* Fixed width for icons */}
                        <FontAwesomeIcon
                          icon={getCategoryIcon(category)}
                          className={`${selectedCategory === category ? 'text-white' : 'text-gray-400'} ${selectedCategory === category ? 'scale-110' : ''}`}
                        />
                      </div>
                      <div className="table-cell align-middle">
                        <span className="text-left pl-1">{category}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}




              {/* Show publications associated with the selected category */}
              <div className='mt-4 pt-2'>
                {sources.filter((source) => source.categories.includes(selectedCategory)).map((source) => (
                  <button
                    key={source.name}
                    onClick={() => handleSourceClick(source.name)}
                    className={`text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${selectedSource === source.name ? 'button-active' : ''}`}
                  >
                    <img src={source.logo} alt={source.name} className="w-6 h-6 rounded-lg" />
                    <span>{source.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )};

          {/* Publications Tab Content */}
          {activeTab === 'publications' && (
            <div>
              {sources.map((source) => (
                <button
                  key={source.name}
                  onClick={() => handleSourceClick(source.name)}
                  className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${selectedSource === source.name ? 'button-active' : ''}`}
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
