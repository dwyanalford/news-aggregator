// app/components/NewsContent.tsx
"use client";

import React, { useState } from 'react';
import NewsSource from './NewsSource';
import NewsMenu from './NewsMenu';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsContent = ({ sources }: { sources: any[] }) => {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [filteredSources, setFilteredSources] = useState(sources);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const { data: newsItems } = useSWR(
    selectedSource ? `/api/news-items?source=${encodeURIComponent(selectedSource.url)}` : null,
    fetcher
  );
  

  const handleSourceSelection = (sourceName: string) => {
    const source = filteredSources.find((s) => s.name === sourceName);
    if (source) {
      setSelectedSource(source);
    }
  };
  

  const handleCategorySelection = (category: string) => {
    const sourcesByCategory = sources.filter((s) => s.categories.includes(category));
    setFilteredSources(sourcesByCategory);
    if (sourcesByCategory.length > 0) {
      setSelectedSource(sourcesByCategory[0]); // Automatically select the first source in the category
    }
  };
  

  return (
    <div className="flex">
      {/* Sidebar (NewsMenu) */}
      <NewsMenu
        sources={sources}
        onSelect={handleSourceSelection}
        onCategorySelect={handleCategorySelection}
        isSidebarOpen={isSidebarOpen} // Pass sidebar state
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Pass toggle function
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 transition-all duration-300 ease-in-out lg:ml-72">
        {newsItems ? (
          <NewsSource
            key={selectedSource.name}
            name={selectedSource.name}
            purpose={selectedSource.purpose}
            items={newsItems}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NewsContent;
