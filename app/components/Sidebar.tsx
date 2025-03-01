// components/Sidebar.tsx

import React, { useState } from 'react';
import ActiveLink from './ActiveLink';
import { 
  Briefcase, GraduationCap, Shirt, HeartPulse, Film, Gavel, Users, 
  Atom, Trophy, Plane 
} from "lucide-react"; // Importing appropriate icons
import DarkModeToggle from '@/app/components/DarkModeToggle';

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

  return (
    <>
      {/* Hamburger button appears when sidebar is closed */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          &#9776;
        </button>
      )}

      {/* Sidebar */}
      <div
        onMouseLeave={toggleSidebar} 
        className={`fixed top-0 left-0 h-screen w-72 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm dark:backdrop-blur-sm`}
      >

        <div className="relative h-full">
          {/* Close button */}
          <button 
            onClick={toggleSidebar}
            className="absolute top-2 right-2 text-gray-700 text-2xl"
          >
            &times;
          </button>

          <div className='toggle-switch flex mt-2 ml-4'>
            <div className='flex w-1/7 text-sm'><DarkModeToggle/></div>
            <h2 className='flex w-6/7 text-sm pt-4'>Light/Dark Mode</h2>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <ActiveLink href={`/usa/${cat.slug}`} className="flex items-center gap-2 px-4 py-2">
                    <cat.icon className="w-5 h-5" />
                    {cat.name}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
