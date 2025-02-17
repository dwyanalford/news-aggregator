"use client";

import { useEffect, useState, useCallback } from "react";
import SidebarLayout from "@/app/components/SidebarLayout";
import ArticleListLayout from "@/app/components/ArticleListLayout";
import ArticleList from "@/app/components/ArticleList";
import ArticleHeader from "@/app/components/ArticleHeader";
import ArticleFilterPanel from "@/app/components/ArticleFilterPanel";

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

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = [...new Set(articles.map(article => article.category))].filter(Boolean);
  const publications = [...new Set(articles.map(article => article.source))].filter(Boolean);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/fetchRecentArticles");
        const json = await res.json();
        if (json.success) {
          setArticles(json.data);
          setFilteredArticles(json.data);
        } else {
          setError("Failed to fetch articles.");
        }
      } catch (err: any) {
        setError(err.message || "Error fetching articles.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const handleFilter = useCallback((type: "category" | "publication", value: string) => {
    setFilteredArticles(
      articles.filter((article) =>
        type === "category" ? article.category === value : article.source === value
      )
    );
  }, [articles]);  // Dependencies ensure function updates only when `articles` change

  const resetFilter = useCallback(() => {
    setFilteredArticles(articles);
  }, [articles]);

  // Calculate today's date
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Count total articles
  const totalArticles = filteredArticles.length;

  if (loading) return <p className="text-center p-4">Loading articles...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarLayout>
      <ArticleFilterPanel 
        totalArticles={totalArticles} 
        categories={categories} 
        publications={publications} 
        onFilter={handleFilter} 
        onReset={resetFilter}   
      />
      </SidebarLayout>

      {/* Main Content Area with Articles */}
      <ArticleHeader totalArticles={totalArticles} todayDate={todayDate} />
      <ArticleListLayout>
        <ArticleList articles={filteredArticles} />
      </ArticleListLayout>
    </div>
  );
}