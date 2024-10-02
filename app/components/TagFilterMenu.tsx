// app/components/TagFilterMenu.tsx

"use client";

import { faTag } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from './SidebarLayout';  // Import the new reusable SidebarLayout component
import useActiveState from '@/app/hooks/useActiveState';  // Import the useActiveState hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface Tag {
    id: string;    // The unique ID for each tag
    name: string;  // The name of the tag
    count: number; // The number of articles associated with the tag
}
   

interface TagFilterMenuProps {
    tags: { id: string, name: string, count: number }[]; 
    onFilter: (tagName: string) => void;  // Function to handle filtering by tag
    isSidebarOpen: boolean;  // Sidebar open/close state
    toggleSidebar: () => void;  // Function to toggle sidebar
    setUserTags: (tags: Tag[]) => void; 
    totalArticles: number;  // New prop to accept total count
}

export default function TagFilterMenu({ tags, onFilter, isSidebarOpen, toggleSidebar, totalArticles }: TagFilterMenuProps) {
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
                  <span>All Saved Articles</span>
                  <span className="bg-red-500 text-white text-md px-2 py-1 rounded-full ml-2">{totalArticles}</span>  {/* Badge with count */}
              </button>

              <div className="mb-2 mt-7">
                  <h2 className="text-lg font-bold">Filter by Tag:</h2>
              </div>

              {/* Render the tags */}
              {tags
              .sort((a, b) => a.name.localeCompare(b.name))  // Ensure tags are sorted alphabetically
              .map((tag, index) => (
                  <button
                      key={`${tag.name}-${index}`}
                      onClick={() => handleTagClick(tag.name)}  // Use handleTagClick to filter
                      className={`flex items-center px-4 py-2 mb-2 ${selectedTag === tag.name ? 'button-active' : ''}`}
                  >
                      <FontAwesomeIcon icon={faTag} className={`${selectedTag === tag.name ? 'text-white' : 'text-gray-400'}`} />
                        <span className="ml-2">{tag.name}</span>
                        {/* Badge with conditional styles based on active/inactive state */}
                        <span
                        className={`${selectedTag === tag.name 
                            ? 'text-white bg-transparent'   // Active state: white text, no background (button will have blue background)
                            : 'bg-gray-300 text-gray-700 border'   // Inactive state: light gray background, dark text
                        } ml-1 text-md px-2 py-1 rounded-full flex items-center justify-center w-6 h-6`} // Ensuring badge is circular
                        >
                        {tag.count}
                        </span>
                  </button>
              ))}
          </div>
      </SidebarLayout>
  );
}
