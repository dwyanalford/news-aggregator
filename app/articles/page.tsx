// app/articles/page.tsx
"use client";

import { useEffect, useState } from "react";
import ArticleList from "@/app/components/ArticleList";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/fetchRecentArticles");
        const json = await res.json();
        if (json.success) {
          setArticles(json.data);
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

  if (loading) return <p className="text-center p-4">Loading articles...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar Placeholder */}
      <aside className="w-1/4 p-4 bg-gray-100">
        <h2 className="font-bold mb-4">Filters</h2>
        <p>Sidebar placeholder – filtering options will go here.</p>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4">
        <h1 className="text-center text-3xl font-bold my-6">Articles</h1>
        <ArticleList articles={articles} />
      </main>
    </div>
  );
}