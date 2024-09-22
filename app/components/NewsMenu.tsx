// app/components/NewsMenu.tsx

"use client";

import { useState, useEffect } from 'react';
import SidebarMenu from './SidebarMenu'; // Import the reusable SidebarMenu component
import { faLaptopCode, faBriefcase, faHeartbeat, faFilm, faFootballBall, faFlask, faGraduationCap, faPlane, faDollarSign, faUtensils, faVenus, faBalanceScale, faTheaterMasks, faTag } from '@fortawesome/free-solid-svg-icons';

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
    // Flatten the categories arrays and then create a unique set of categories
    const categoriesFromSources = Array.from(new Set(sources.flatMap((source) => source.categories)));
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

    const sourcesByCategory = sources.filter((source) => source.categories.includes(category));
    if (sourcesByCategory.length > 0) {
      setSelectedSource(sourcesByCategory[0].name);
      onSelect(sourcesByCategory[0].name);
    }
  };

  // Function to get the appropriate icon for each category
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

  // Define tabs for categories and publications
  const tabs = [
    { name: 'Categories', onClick: () => setActiveTab('categories') },
    { name: 'Publications', onClick: () => setActiveTab('publications') },
  ];

  // Data to pass to SidebarMenu based on active tab
  const sidebarItems = activeTab === 'categories' 
    ? uniqueCategories.map((category) => ({ name: category, icon: getCategoryIcon(category) }))  // Include icons for categories
    : sources.map((source) => ({ name: source.name, logo: source.logo }));  // Include logos for publications

  return (
    <SidebarMenu
      items={sidebarItems}
      onItemClick={activeTab === 'categories' ? handleCategoryClick : handleSourceClick}
      activeItem={activeTab === 'categories' ? selectedCategory : selectedSource}
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      tabs={tabs} // Pass the tab configuration
    />
  );
}
