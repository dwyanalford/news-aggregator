// components/Sidebar.tsx

import React, { useState } from 'react';
import ActiveLink from './ActiveLink';
import DarkModeToggle from '@/app/components/DarkModeToggle';
import { 
  Menu, Search, Edit3, ChevronDown,
  Zap, BookOpen, Calendar, MessageCircle,
  Briefcase, GraduationCap, Shirt, HeartPulse, Film, Gavel, Users, 
  Atom, Trophy, Plane,
  Crown
} from "lucide-react";

// Main menu (without "Articles" because that's now a group header)
const mainMenu = [
  { name: 'Features', slug: 'features', icon: Zap },
  { name: 'Publications', slug: 'publications', icon: BookOpen },
  { name: 'Events', slug: 'events', icon: Calendar },
  { name: 'Feedback', slug: 'feedback', icon: MessageCircle },
];

const premiumMenu = [
  { name: 'Dashboard', slug: 'dashboard', icon: Edit3 },
  { name: 'Profile', slug: 'profile', icon: Edit3 },
];

const regionMenu = [
  { name: 'Africa', slug: 'africa' },
  { name: 'Caribbean', slug: 'caribbean' },
  { name: 'UK', slug: 'uk' },
  { name: 'USA', slug: 'usa' },
];

const categories = [
  { name: 'Business & Finance', slug: 'business-and-finance', icon: Briefcase },
  { name: 'Education', slug: 'education', icon: GraduationCap },
  { name: 'Fashion', slug: 'fashion', icon: Shirt },
  { name: 'Health & Wellness', slug: 'health-and-wellness', icon: HeartPulse },
  { name: 'Music & Film', slug: 'music-and-film', icon: Film },
  { name: 'Politics & Law', slug: 'politics-and-law', icon: Gavel },
  { name: 'Pop Culture & Celebrities', slug: 'pop-culture-and-celebrities', icon: Users },
  { name: 'Science & Technology', slug: 'science-and-technology', icon: Atom },
  { name: 'Sports', slug: 'sports', icon: Trophy },
  { name: 'Travel & Food', slug: 'travel-and-food', icon: Plane },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  // Collapsible state for Region and Category (default open)
  const [regionOpen, setRegionOpen] = useState(true);
  const toggleRegion = () => setRegionOpen(prev => !prev);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const toggleCategory = () => setCategoryOpen(prev => !prev);

  // Example premium check—replace with your real logic
  const isPremium = false;

  return (
    <>
      {/* Hamburger button (visible when sidebar is closed) */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          <Menu 
            size={20} 
            className="transition-colors duration-300 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400" 
          />
        </button>
      )}

      {/* Main Sidebar */}
      <div
        onMouseLeave={() => setIsOpen(false)}
        className={`fixed top-0 left-0 h-screen w-72 z-40 transform transition-all ${
          isOpen ? 'translate-x-0 opacity-100 duration-300' : '-translate-x-full opacity-0 duration-500'
        } bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm dark:backdrop-blur-sm`}
      >
        <div className="flex flex-col h-full text-gray-800 dark:text-gray-200">
          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto">
            {/* Top Menu: Left icon and Right icons */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
              {/* Open/close menu icon on the left */}
              <button 
                onClick={toggleSidebar} 
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <Menu size={20} className="transition-colors duration-300" />
              </button>
              {/* Right menu icons */}
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  <Search size={20} className="transition-colors duration-300" />
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  <Edit3 size={20} className="transition-colors duration-300" />
                </button>
                <div className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  <DarkModeToggle />
                </div>
              </div>
            </div>

            {/* Site Logo & Name */}
            <div className="px-4 py-4 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                {/* Replace with your actual logo */}
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <span className="font-semibold text-lg">MyApp</span>
              </div>
            </div>

            {/* Articles Group */}
            <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Articles</h3>
              
              {/* Collapsible Region Section */}
              <div className="mt-2">
                <button
                  onClick={toggleRegion}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>Region</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${regionOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {regionOpen && (
                  <ul className="ml-4 space-y-1">
                    {regionMenu.map((region) => (
                      <li key={region.slug}>
                        <ActiveLink
                          href={`/region/${region.slug}`}
                          className="block px-3 py-1 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {region.name}
                        </ActiveLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Collapsible Category Section */}
              <div className="mt-2">
                <button
                  onClick={toggleCategory}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>Category</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {categoryOpen && (
                  <ul className="ml-4 space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <ActiveLink
                          href={`/usa/${cat.slug}`}
                          className="flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <cat.icon size={16} className="transition-colors duration-300 text-current" />
                          {cat.name}
                        </ActiveLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Main Menu */}
            <div className="p-4 space-y-2">
              {mainMenu.map((item) => (
                <ActiveLink
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon size={16} className="transition-colors duration-300 text-current" />
                  {item.name}
                </ActiveLink>
              ))}

              {/* Premium Menu if applicable */}
              {isPremium && (
                <div className="mt-2 space-y-1">
                  {premiumMenu.map((pItem) => (
                    <ActiveLink
                      key={pItem.slug}
                      href={`/${pItem.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <pItem.icon size={16} className="transition-colors duration-300 text-current" />
                      {pItem.name}
                    </ActiveLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upgrade Button fixed at bottom */}
          {!isPremium && (
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
              <button
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-white 
                           bg-green-600 hover:bg-green-700 rounded-md font-normal"
              >
                <Crown size={16} className="transition-colors duration-300" />
                Upgrade
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
