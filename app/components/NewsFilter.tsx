// app/components/NewsFilter.tsx
"use client";

import React, { ChangeEvent } from 'react';

interface NewsFilterProps {
  filter: 'today' | 'pastWeek' | 'pastTwoWeeks';
  onFilterChange: (filter: 'today' | 'pastWeek' | 'pastTwoWeeks') => void;
}

const NewsFilter: React.FC<NewsFilterProps> = ({ filter, onFilterChange }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as 'today' | 'pastWeek' | 'pastTwoWeeks');
  };

  return (
    <div className="mb-4">
      <label htmlFor="news-filter" className="mr-2">Filter:</label>
      <select id="news-filter" value={filter} onChange={handleChange}>
        <option value="today">Today's News</option>
        <option value="pastWeek">Past Week</option>
        <option value="pastTwoWeeks">Past Two Weeks</option>
      </select>
    </div>
  );
};

export default NewsFilter;
