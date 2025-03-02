// usa/[slug]/page.tsx (Server Component)
import { Article } from "@/app/types";
import ArticlesList from "@/app/components/ArticlesList";

export default async function SlugTestPage({ params }: { params: { slug: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/fetchRecentArticles?slug=${params.slug}`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  const articles: Article[] = data.data || [];

  return <ArticlesList articles={articles} />;
}
