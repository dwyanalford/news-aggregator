// app/components/NewsContent.tsx
"use client";

import React, { useState, useEffect } from 'react';
import NewsSource from './NewsSource';
import NewsMenu from './NewsMenu';
import useSWR from 'swr';
import Loading from './Loading';

import blackAmericanData from '@/app/data/blackAmericanData';
import africaData from '@/app/data/africaData';
import ukData from '@/app/data/ukData';

// Map regions to their corresponding data files
const regionData: { [key: string]: any } = {
  blackamerican: blackAmericanData,
  africa: africaData,
  uk: ukData,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Render news content based on selected source and region
const NewsContent = ({ sources, region }: { sources: any[], region: string }) => {
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
        sources={sources} // Passes the sources for the sidebar
        onSelect={handleSourceSelection} // Handles source selection
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
            data={regionData[region]} // Dynamically load region-specific data
          />
        ) : (
          <Loading isLoading={isLoading} />

        )}
      </div>
    </div>
  );
};

export default NewsContent;
