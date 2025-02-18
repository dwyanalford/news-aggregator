"use client";

import { useEffect, useState, useCallback } from "react";
import SidebarLayout from "@/app/components/SidebarLayout";
import ArticleListLayout from "@/app/components/ArticleListLayout";
import ArticleList from "@/app/components/ArticleList";
import ArticleHeader from "@/app/components/ArticleHeader";
import ArticleFilterPanel from "@/app/components/ArticleFilterPanel";

// Define the structure of an article object
interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL?: string;
  author?: string;
  source: string;
  category: string;
  region: string;
}

// Define the structure for publication details
interface Publication {
  name: string;
  logo: string;
  purpose: string;
}

export default function ArticlesPage() {
  console.log("Rendering ArticlesPage...");

  // State for storing all articles and the currently filtered articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // New state for selected publication
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  // Extract unique categories and publications from articles
  const categories = [...new Set(articles.map(article => article.category))].filter(Boolean);
  const publications = [...new Set(articles.map(article => article.source))].filter(Boolean);

  // Fetch recent articles from API on component mount
  useEffect(() => {
    async function fetchArticles() {
      console.log("Fetching articles from API...");
      try {
        const res = await fetch("/api/fetchRecentArticles");
        const json = await res.json();

        if (json.success) {
          console.log(`Successfully fetched ${json.data.length} articles.`);
          setArticles(json.data);
          setFilteredArticles(json.data);
        } else {
          console.error("Failed to fetch articles.");
          setError("Failed to fetch articles.");
        }
      } catch (err: any) {
        console.error("Error fetching articles:", err.message);
        setError(err.message || "Error fetching articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Handle filtering articles by category or publication
  const handleFilter = useCallback((type: "category" | "publication", value: string) => {
    console.log(`Applying filter: ${type} = ${value}`);
    setFilteredArticles(
      articles.filter((article) =>
        type === "category" ? article.category === value : article.source === value
      )
    );
    if (type === "publication") {
      // Fetch publication data (logo and purpose) from the API
      fetch(`/api/rss?publication=${value}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setSelectedPublication(data.data); // Set the selected publication
          } else {
            setSelectedPublication(null); // Fallback if publication data fetch fails
            console.error("Failed to fetch publication data");
          }
        })
        .catch(error => {
          setSelectedPublication(null); // Fallback on error
          console.error("Error fetching publication data:", error);
        });
    }
  }, [articles]);

  // Reset filters to show all articles
  const resetFilter = useCallback(() => {
    console.log("Resetting filters, showing all articles.");
    setFilteredArticles(articles);
    setSelectedPublication(null);
  }, [articles]);

  // Format today's date
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Count total articles after filtering
  const totalArticles = filteredArticles.length;
  console.log(`Total articles after filtering: ${totalArticles}`);

  // Handle loading and error states
  if (loading) return <p className="text-center p-4">Loading articles...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar containing filtering options */}
      <SidebarLayout>
        <ArticleFilterPanel 
          totalArticles={totalArticles} 
          categories={categories} 
          publications={publications} 
          onFilter={handleFilter} 
          onReset={resetFilter}   
        />
      </SidebarLayout>

      {/* Fixed article header above the list */}
      <ArticleHeader 
        totalArticles={totalArticles} 
        todayDate={todayDate} 
        selectedPublication={selectedPublication || undefined} 
      />

      {/* Main content area displaying filtered articles */}
      <ArticleListLayout>
        <ArticleList articles={filteredArticles} />
      </ArticleListLayout>
    </div>
  );
}