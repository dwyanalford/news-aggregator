// app/components/NewsMenu.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import SidebarLayout from './SidebarLayout';
import NewsFilter from './NewsFilter';

interface NewsMenuProps {
  sources: any[]; // List of publication sources
  onSelect: (sourceName: string) => void; // Callback when a source is selected
  isSidebarOpen: boolean; // Sidebar visibility state
  toggleSidebar: () => void; // Function to toggle sidebar
  currentFilter: 'today' | 'pastWeek' | 'pastTwoWeeks'; // Current filter selection
  onFilterChange: (filter: 'today' | 'pastWeek' | 'pastTwoWeeks') => void; // Callback when filter changes
}

export default function NewsMenu({
  sources,
  onSelect,
  isSidebarOpen,
  toggleSidebar,
  currentFilter,
  onFilterChange,
}: NewsMenuProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0]?.name || '');

  const handleSourceClick = (sourceName: string) => {
    setSelectedSource(sourceName);
    onSelect(sourceName);
  };

  return (
    <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div>
        {/* Controlled NewsFilter: the filter persists from the parent */}
        <NewsFilter filter={currentFilter} onFilterChange={onFilterChange} />

        <h2 className="sub-text mb-4">Publications:</h2>
        {sources.map((source) => (
          <button
            key={source.name}
            onClick={() => handleSourceClick(source.name)}
            className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 mb-1 ${
              selectedSource === source.name ? 'button-active' : 'button-inactive'
            }`}
          >
            <img src={source.logo} alt={source.name} className="w-6 h-6 rounded-lg" />
            <span>{source.name}</span>
          </button>
        ))}
      </div>
    </SidebarLayout>
  );
}
