// app/components/TagFilterMenu.tsx

"use client";

import { useState, useEffect } from 'react';
import SidebarMenu from './SidebarMenu';  // Import the reusable SidebarMenu component
import { fetchUserTags } from '@/app/utils/fetchUserTagsUtils'; 

interface TagFilterMenuProps {
    tags: string[];  // Array of tag names
    onFilter: (tagName: string) => void;  // Function to handle filtering by tag
    isSidebarOpen: boolean;  // Sidebar open/close state
    toggleSidebar: () => void;  // Function to toggle sidebar
}

export default function TagFilterMenu({ tags, onFilter, isSidebarOpen, toggleSidebar }: TagFilterMenuProps) {
    const [userTags, setUserTags] = useState<string[]>([]);  // State to store fetched user tags
    const [selectedTag, setSelectedTag] = useState<string>('ALL');  // State to manage selected tag
  
    // Fetch user tags when the component loads
    useEffect(() => {
      fetchUserTags().then((tags) => {
        setUserTags(tags);  // Always fetch all user tags here
        console.log('Fetched user tags:', tags);  // Debugging: Log fetched tags
      }).catch((error) => {
        console.error('Error fetching user tags:', error);  // Error handling
      });
    }, []);  // Run only once on component mount
  
    // Handle tag click to filter articles
    const handleTagClick = (tag: string) => {
      console.log('Selected Tag:', tag);  // Debugging: Log selected tag to check if the function is called correctly
      setSelectedTag(tag);  // Set selected tag
      onFilter(tag);  // Trigger the filter callback with the selected tag
    };
  
    // Sidebar items including "ALL" tab and user tags
    const sidebarItems = ['ALL', ...userTags].map(tag => ({ name: tag }));  // "ALL" tab at the top
    console.log('Sidebar Items:', sidebarItems);  // Debugging: Log sidebar items
    
    return (
      <SidebarMenu
        items={sidebarItems}  // Pass "ALL" tab and user tags as sidebar items
        onItemClick={handleTagClick}  // Handle tag click to filter articles
        activeItem={selectedTag}  // Highlight the selected tag
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    );
}
