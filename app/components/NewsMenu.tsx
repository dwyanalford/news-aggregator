// app/components/NewsMenu.tsx
"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faBriefcase, faHeartbeat, faFilm, faFootballBall, faFlask, faGraduationCap, faPlane, faDollarSign, faUtensils, faVenus, faBalanceScale, faTheaterMasks, faTag } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from './SidebarLayout';  // Import the new SidebarLayout component

interface NewsMenuProps {
  sources: any[];
  onSelect: (sourceName: string) => void;
  onCategorySelect: (category: string) => void;
  isSidebarOpen: boolean;  // Sidebar open/close state
  toggleSidebar: () => void;  // Function to toggle sidebar
}

export default function NewsMenu({ sources, onSelect, onCategorySelect, isSidebarOpen, toggleSidebar }: NewsMenuProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0]?.name || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'categories' | 'publications'>('categories');

  useEffect(() => {
    const categoriesFromSources = Array.from(new Set(sources.flatMap((source) => source.categories)));
    setUniqueCategories(categoriesFromSources);
    setSelectedCategory(categoriesFromSources[0]);  // Select the first category by default
    handleCategoryClick(categoriesFromSources[0]);  // Automatically select the first category
  }, [sources]);

  useEffect(() => {
    if (activeTab === 'publications') {
      setSelectedCategory('');
    }
  }, [activeTab, sources]);

  const handleTabClick = (tab: 'categories' | 'publications') => {
    setActiveTab(tab);
    if (tab === 'publications') {
      if (sources.length > 0) {
        setSelectedSource(sources[0].name);
        onSelect(sources[0].name);
      }
    }
  };

  const handleSourceClick = (sourceName: string) => {
    const source = sources.find((s) => s.name === sourceName);
    if (source) {
      setSelectedSource(source.name);
      onSelect(source.name);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    const sourcesByCategory = sources.filter((source) => source.categories.includes(category));
    if (sourcesByCategory.length > 0) {
      setSelectedSource(sourcesByCategory[0].name);
      onSelect(sourcesByCategory[0].name);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology': return faLaptopCode;
      case 'Business': return faBriefcase;
      case 'Health': return faHeartbeat;
      case 'Entertainment': return faFilm;
      case 'Sports': return faFootballBall;
      case 'Science': return faFlask;
      case 'Education': return faGraduationCap;
      case 'Travel': return faPlane;
      case 'Finance': return faDollarSign;
      case 'Food': return faUtensils;
      case 'Black Women': return faVenus;
      case 'Culture': return faTheaterMasks;
      case 'Politics': return faBalanceScale;
      default: return faTag;
    }
  };

  return (
    <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`button-2 ${activeTab === 'categories' ? 'button-active' : 'button-inactive'} `}
          onClick={() => handleTabClick('categories')}
        >
          Categories
        </button>
        <button
          className={`button-2 ${activeTab === 'publications' ? 'button-active' : 'button-inactive'} `}
          onClick={() => handleTabClick('publications')}
        >
          Publications
        </button>
      </div>

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div className="mb-8">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center button-4 ${selectedCategory === category ? 'button-active' : ''}`}
            >
              <div className="table w-full">
                <div className="table-row">
                  <div className="table-cell align-middle w-8">
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

          {/* Publications Associated with Category */}
          <div className="mt-4 pt-2">
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
      )}

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
    </SidebarLayout>
  );
}
