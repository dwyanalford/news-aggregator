// app/components/NewsContent.tsx
"use client";

import React, { useState, useEffect } from 'react';
import NewsSource from './NewsSource';
import NewsMenu from './NewsMenu';
import useSWR from 'swr';
import Loading from './Loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsContent = ({ sources }: { sources: any[] }) => {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [filteredSources, setFilteredSources] = useState(sources);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Currently selected source:", selectedSource);
  }, [selectedSource]);
  
  const { data: newsItems, error } = useSWR(
    selectedSource ? `/api/news-items?source=${encodeURIComponent(selectedSource.url)}` : null,
    fetcher
  );

  useEffect(() => {
    if (!selectedSource) return;
  
    const controller = new AbortController();
    const { signal } = controller;
  
    const fetchArticles = async () => {
      try {
        console.log("Fetching articles from URL:", `/api/news-items?source=${encodeURIComponent(selectedSource.url)}`);
        const response = await fetch(`/api/news-items?source=${encodeURIComponent(selectedSource.url)}`, { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        // Update your state with the fetched articles here
        console.log("Fetched data:", data);
      } catch (error) {
        if ((error as { name: string }).name !== 'AbortError') {
          console.error("Fetch error:", error);
        }
      }
    };
  
    fetchArticles();
  
    return () => {
      controller.abort(); // Cancel the previous request
    };
  }, [selectedSource]);
  
  const handleSourceSelection = (sourceName: string) => {
    console.log("Selected source:", sourceName);  
    const source = sources.find((s) => s.name === sourceName);
    if (source) {
      setSelectedSource(source);
    }
  };
  
  return (
    <div className="flex">
      {/* Sidebar (NewsMenu) */}
      <NewsMenu
        sources={sources}
        onSelect={handleSourceSelection}
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
          <Loading isLoading={isLoading} />

        )}
      </div>
    </div>
  );
};

export default NewsContent;
