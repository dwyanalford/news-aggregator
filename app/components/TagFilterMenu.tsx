// app/components/TagFilterMenu.tsx

"use client";

import { faTag } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from './SidebarLayout';  // Import the new reusable SidebarLayout component
import useActiveState from '@/app/hooks/useActiveState';  // Import the useActiveState hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface TagFilterMenuProps {
    tags: string[];  // Array of tag names
    onFilter: (tagName: string) => void;  // Function to handle filtering by tag
    isSidebarOpen: boolean;  // Sidebar open/close state
    toggleSidebar: () => void;  // Function to toggle sidebar
}

export default function TagFilterMenu({ tags, onFilter, isSidebarOpen, toggleSidebar }: TagFilterMenuProps) {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');  // Ensure this state exists

  const handleTagClick = (tag: string) => {
      setSelectedTag(tag);  // Update the selected tag
      onFilter(tag === 'ALL' ? 'ALL' : tag);  // Pass the selected tag to the parent for filtering
  };

  return (
      <SidebarLayout
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
      >
          <div>
              {/* "ALL" option */}
              <button
                  onClick={() => handleTagClick('ALL')}
                  className={`text-left py-2 px-4 mt-6 ${selectedTag === 'ALL' ? 'button-active' : 'button-inactive'}`}
              >
                  All Saved Articles
              </button>

              <div className="mb-2 mt-7">
                  <h2 className="text-lg font-bold">Filter by Tag:</h2>
              </div>

              {/* Render the tags */}
              {tags.map((tag) => (
                  <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}  // Use handleTagClick to filter
                      className={`flex items-center px-4 py-2 ${selectedTag === tag ? 'button-active' : ''}`}
                  >
                      <FontAwesomeIcon icon={faTag} className={`${selectedTag === tag ? 'text-white' : 'text-gray-400'}`} />
                      <span className="ml-2">{tag}</span>
                  </button>
              ))}
          </div>
      </SidebarLayout>
  );
}
