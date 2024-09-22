// app/components/TagFilterArticles.tsx

"use client";

import { useState, useEffect } from 'react';
import TagFilterMenu from './TagFilterMenu';  // Import TagFilterMenu component
import axios from 'axios';  // Axios for API requests

export interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL: string;
  tags: string[];
}

interface Tag {
  id: string;
  name: string;
}

export default function TagFilterArticles() {
  const [articles, setArticles] = useState<Article[]>([]);  // All saved articles
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);  // Articles filtered by selected tag
  const [tags, setTags] = useState<Tag[]>([]);  // User-created tags
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);  // Sidebar visibility state

  // Fetch saved articles and tags on mount
  useEffect(() => {
    fetchSavedArticles();  // Fetch articles
    fetchUserTags();  // Fetch user-created tags
  }, []);

  const fetchSavedArticles = async () => {
    try {
      const response = await axios.get('/api/articles/getSaved');
      if (response.status === 200) {
        setArticles(response.data);  // Store all articles
        setFilteredArticles(response.data);  // Initialize with all articles shown
      }
    } catch (error) {
      console.error('Failed to fetch saved articles:', error);
    }
  };

  const fetchUserTags = async () => {
    try {
      const response = await axios.get('/api/tags/userTags');  // Example API endpoint to fetch tags
      if (response.status === 200) {
        setTags(response.data);  // Store user-created tags
      }
    } catch (error) {
      console.error('Failed to fetch user tags:', error);
    }
  };

  // Filter articles by selected tag
  const handleFilter = (tagName: string) => {
    if (!tagName) {
      setFilteredArticles(articles);  // If no tag is selected, show all articles
      return;
    }
    const filtered = articles.filter(article => article.tags.includes(tagName));  // Filter by tag
    setFilteredArticles(filtered);  // Update filtered articles state
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* TagFilterMenu for selecting tags */}
      <TagFilterMenu
        tags={tags.map(tag => tag.name)}  // Pass tag names to TagFilterMenu
        articles={articles}  // All articles for filtering reference
        onFilter={handleFilter}  // Pass filter function to handle tag selection
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content area for displaying filtered articles */}
      <div className="flex-grow p-4">
        <h2 className="text-xl font-bold mb-4">Filtered Saved Articles</h2>
        {filteredArticles.length === 0 ? (
          <p>No articles found for the selected tag.</p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="mb-4 p-4 border rounded shadow-md bg-white">
              <img src={article.imageURL} alt={article.title} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
              <p>{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">Read more</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
