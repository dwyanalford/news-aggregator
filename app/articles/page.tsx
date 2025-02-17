"use client";

import { useEffect, useState } from "react";
import SidebarLayout from "@/app/components/SidebarLayout";
import ArticleListLayout from "@/app/components/ArticleListLayout";
import ArticleList from "@/app/components/ArticleList";
import ArticleHeader from "@/app/components/ArticleHeader";

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

  const handleFilter = (type: string, value: string) => {
    if (type === "all") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((article) => article[type as keyof Article] === value));
    }
  };

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
        <div>Hello there, welcome to the sidebar layout</div>
      </SidebarLayout>

      {/* Main Content Area with Articles */}
      <ArticleHeader totalArticles={totalArticles} todayDate={todayDate} />
      <ArticleListLayout>
        <ArticleList articles={filteredArticles} />
      </ArticleListLayout>
    </div>
  );
}