// app/components/NewsContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import NewsSource from "./NewsSource";
import NewsMenu from "./NewsMenu";
import useSWR from "swr";
import Loading from "./Loading";
import Message from "./Message";

import blackAmericanData from "@/app/data/blackAmericanData";
import africaData from "@/app/data/africaData";
import ukData from "@/app/data/ukData";

const regionData: { [key: string]: any } = {
  blackamerican: blackAmericanData,
  africa: africaData,
  uk: ukData,
};

const fetcher = async (url: string) => {
  const response = await fetch(url);

  // Check if the response is not okay (e.g., 403, 404)
  if (!response.ok) {
    throw new Error(`Failed to fetch news. HTTP status: ${response.status}`);
  }

  const data = await response.json();

  // Log the API response to confirm what is being handled
  console.log("API Response:", data);

  // If the response is empty, return the empty array as is
  if (Array.isArray(data) && data.length === 0) {
    return [];
  }

  return data; // Return the fetched data
};



const NewsContent = ({ sources, region }: { sources: any[]; region: string }) => {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [filteredSources, setFilteredSources] = useState(sources);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [noNews, setNoNews] = useState(false);

  useEffect(() => {
    console.log("Currently selected source:", selectedSource);
  }, [selectedSource]);

  const { data: newsItems, error } = useSWR(
    selectedSource ? `/api/news-items?source=${encodeURIComponent(selectedSource.url)}` : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      // Handle fetch failure
      setFetchError(error.message || "Failed to fetch news. Please try again later.");
      setNoNews(false); // Reset noNews in case of fetch error
    } else if (newsItems && Array.isArray(newsItems) && newsItems.length === 0) {
      // Handle empty results
      setNoNews(true); // No news available for the selected source
      setFetchError(null); // Reset fetchError in case of empty array
    } else if (newsItems && Array.isArray(newsItems) && newsItems.length > 0) {
      // Handle valid results
      setNoNews(false); // Reset noNews for valid articles
      setFetchError(null); // Reset fetchError for valid fetch
    }
  
    // Stop loading once a result is processed
    setIsLoading(false);
  }, [newsItems, error]);
  

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
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-8 transition-all duration-300 ease-in-out lg:ml-72 mt-[100px]">
        {fetchError ? (
          // Show error message
          <Message
            type="error"
            message={fetchError}
            show={true}
            onClose={() => setFetchError(null)}
          />
        ) : noNews ? (
          // Show "No news available today" message
          <Message
            type="error"
            message="No news available today."
            show={true}
            onClose={() => setNoNews(false)}
          />
        ) : newsItems && Array.isArray(newsItems) ? (
          // Render news items when available
          <NewsSource
            key={selectedSource.name}
            name={selectedSource.name}
            purpose={selectedSource.purpose}
            items={newsItems}
            data={regionData[region]}
          />
        ) : (
          // Show loading spinner while fetching
          <Loading isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default NewsContent;
