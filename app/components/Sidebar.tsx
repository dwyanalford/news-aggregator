// components/Sidebar.tsx
import React, { useState } from 'react';
import ActiveLink from './ActiveLink';

const categories = [
  { name: 'Business & Finance', slug: 'business-and-finance' },
  { name: 'Education', slug: 'education' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Health & Wellness', slug: 'health-and-wellness' },
  { name: 'Music & Film', slug: 'music-and-film' },
  { name: 'Politics & Law', slug: 'politics-and-law' },
  { name: 'Pop Culture & Celebrities', slug: 'pop-culture-and-celebrities' },
  { name: 'Science & Technology', slug: 'science-and-technology' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Travel & Food', slug: 'travel-and-food' },
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
        className={`fixed top-0 left-0 h-screen w-64 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-black bg-opacity-70 backdrop-blur-sm`}
      >
        <div className="relative h-full">
          {/* Close button */}
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>

          {/* Sidebar Content */}
          <div className="mt-16 p-4">
            <h2 className="text-2xl font-bold mb-6 text-white">Categories</h2>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <ActiveLink href={`/usa/${cat.slug}`}>
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
