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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
      setFetchError("Failed to fetch news. Please check the RSS feed.");
      setNoNews(false); // Reset noNews in case of fetch error
    } else if (newsItems && Array.isArray(newsItems) && newsItems.length === 0) {
      console.log(`Articles returned for ${selectedSource.name}: ${newsItems.length}`); // Debugging number of articles
      setNoNews(true); // No articles available
      setFetchError(null); // Reset fetchError in case of empty data
    } else {
      setFetchError(null);
      setNoNews(false); // Reset both error and noNews for valid data
    }
    setIsLoading(false); // Stop loading regardless of state
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
