// components/Sidebar.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import ActiveLink from './ActiveLink';
import DarkModeToggle from '@/app/components/DarkModeToggle';
import {
  Menu, Search, Edit3, ChevronDown,
  Zap, BookOpen, Calendar, MessageCircle,
  Briefcase, GraduationCap, Shirt, HeartPulse, Film, Gavel, Users,
  Atom, Trophy, Plane,
  Crown
} from "lucide-react";

// Global navigation menu with accent colors
const mainMenu = [
  { name: 'Features', slug: 'features', icon: Zap, accent: 'text-blue-500 hover:text-blue-600' },
  { name: 'Publications', slug: 'publications', icon: BookOpen, accent: 'text-red-500 hover:text-red-600' },
  { name: 'Events', slug: 'events', icon: Calendar, accent: 'text-purple-500 hover:text-purple-600' },
  { name: 'Feedback', slug: 'feedback', icon: MessageCircle, accent: 'text-yellow-500 hover:text-yellow-600' },
];

// (Optional) Premium menu for registered users
const premiumMenu = [
  { name: 'Dashboard', slug: 'dashboard', icon: Edit3 },
  { name: 'Profile', slug: 'profile', icon: Edit3 },
];

// Region menu – for now, only USA will be active
const regionMenu = [
  { name: 'Africa', slug: 'africa' },
  { name: 'Caribbean', slug: 'caribbean' },
  { name: 'UK', slug: 'uk' },
  { name: 'USA', slug: 'usa' },
];

// Categories (identical across regions)
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
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Active region state; default is "usa"
  const [activeRegion, setActiveRegion] = useState("usa");

  // Example premium check (set to false for now)
  const isPremium = false;

  return (
    <>
      {/* Hamburger button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          <Menu size={35} className="transition-colors duration-300 text-gray-400 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400" />
        </button>
      )}

      {/* Main Sidebar with auto-close on mouse leave and fade-out effect */}
      <div
        onMouseLeave={() => setIsOpen(false)}
        className={`fixed top-0 left-0 h-screen w-72 z-40 transform transition-all ${
          isOpen ? 'translate-x-0 opacity-100 duration-300' : '-translate-x-full opacity-0 duration-500'
        } bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm dark:backdrop-blur-sm`}
      >
        <div className="flex flex-col h-full text-gray-800 dark:text-gray-200">
          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto">
            {/* Top Menu: Hamburger and right icons */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={toggleSidebar}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <Menu size={30} className="transition-colors duration-300" />
              </button>
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

            {/* Branding Section */}
            <div className="px-4 py-4 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                {/* <Image
                  src="/images/logos/logo-dwyan-symbol-small.png"
                  alt="Logo Symbol"
                  width={32}
                  height={32}
                  className="rounded-full"
                /> */}
                <Image
                  src="/images/logos/logo-dwyan-text-grey-small.png"
                  alt="Logo Text"
                  width={80}
                  height={23}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Articles Group: Region Selection and Categories */}
<div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 mt-2">
  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Articles</h3>
  {/* Region Dropdown */}
  <div className="mt-2">
    <label htmlFor="region-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
      Select Region:
    </label>
    <select
      id="region-select"
      value={activeRegion}
      onChange={(e) => setActiveRegion(e.target.value)}
      className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-gray-600 mb-4"
    >
      {regionMenu.map((region) => (
        <option key={region.slug} value={region.slug}>
          {region.name}
        </option>
      ))}
    </select>
  </div>
  {/* Category List for USA (only display if activeRegion is 'usa') */}
  {activeRegion === "usa" && (
    <div className="mt-4 mb-3">
      <label htmlFor="category-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400">
        Select Category:
      </label>
      <ul id="category-select" className="mt-1 ml-2 space-y-1">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <ActiveLink
              href={`/${activeRegion}/${cat.slug}`}
              className="flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <cat.icon size={16} className="transition-colors duration-300 text-current" />
              {cat.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>


            {/* Global Navigation */}
            <div className="p-4 space-y-2">
              {mainMenu.map((item) => (
                <ActiveLink
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon size={16} className={`${item.accent} transition-colors duration-300`} />
                  {item.name}
                </ActiveLink>
              ))}
              {/* Premium Menu (if applicable) */}
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
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md font-normal"
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
