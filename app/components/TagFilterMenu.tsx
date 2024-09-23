// app/components/TagFilterMenu.tsx

"use client";

import { useState, useEffect } from 'react';
import SidebarMenu from './SidebarMenu';  // Import the reusable SidebarMenu component
import axios from 'axios';

interface TagFilterMenuProps {
    tags: string[];  // Array of tag names
    setUserTags: (tags: string[]) => void;  // Function to update the tags in real time
    onFilter: (tagName: string) => void;  // Function to handle filtering by tag
    isSidebarOpen: boolean;  // Sidebar open/close state
    toggleSidebar: () => void;  // Function to toggle sidebar
}

export default function TagFilterMenu({ tags, setUserTags, onFilter, isSidebarOpen, toggleSidebar }: TagFilterMenuProps) {
    const [selectedTag, setSelectedTag] = useState<string>('ALL');  // State to manage selected tag
    const [userTags, setLocalUserTags] = useState<string[]>(tags);  // Local state to store fetched user tags

  useEffect(() => {
    setLocalUserTags(tags);  // Update local state when props change
  }, [tags]);  // Update the sidebar when the tags prop changes
  
  
  // Handle tag click to filter articles
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);  // Set the clicked tag as the active tag
    onFilter(tag === 'ALL' ? 'ALL' : tag);  // Pass the selected tag to the parent for filtering articles
  };

  // Sidebar items including "ALL" tab and user tags
  const sidebarItems = [{ id: 'ALL', name: 'ALL' }, ...userTags.map(tag => ({ id: tag, name: tag }))];

    
    return (
      <SidebarMenu
        items={sidebarItems}  // Pass tags as sidebar items
        onItemClick={handleTagClick}  // Handle tag click to filter articles
        activeItem={selectedTag}  // Highlight the selected tag
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    );
}
