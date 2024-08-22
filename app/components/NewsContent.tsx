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

  const { data: newsItems } = useSWR(
    `/api/news-items?source=${encodeURIComponent(selectedSource.url)}`,
    fetcher
  );

  const handleSourceSelection = (sourceName: string) => {
    const source = filteredSources.find((s) => s.name === sourceName);
    if (source) setSelectedSource(source);
  };

  const handleCategorySelection = (category: string) => {
    const sourcesByCategory = sources.filter((s) => s.category === category);
    setFilteredSources(sourcesByCategory);
    if (sourcesByCategory.length > 0) {
      setSelectedSource(sourcesByCategory[0]); // Automatically select the first source in the category
    }
  };

  return (
    <div className="flex">
      {/* Sidebar (NewsMenu) */}
      <div className="w-64 bg-gray-800 space-y-4 fixed h-full">
        <NewsMenu
          sources={sources}
          onSelect={handleSourceSelection}
          onCategorySelect={handleCategorySelection}
        />
      </div>

      {/* Main Content Area */}
      <div className="ml-72 flex-1 p-4 overflow-x-hidden">
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
