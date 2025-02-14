// app/articles/[region]/page.tsx

// ✅ Import necessary modules
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlesList from "@/app/components/ArticleList";
import Link from "next/link";

// ✅ Define the expected props for this page component
interface PageProps {
  params: { region?: string }; // ✅ Region comes from the URL
  searchParams: { page?: string }; // ✅ Query parameters for pagination
}

// ✅ Generate metadata dynamically for SEO
export function generateMetadata({ params }: PageProps): Metadata {
  const region = params.region || "usa"; // ✅ Default region if not specified
  const regionTitle = region.charAt(0).toUpperCase() + region.slice(1); // ✅ Capitalize region name

  return {
    title: `${regionTitle} News - dwyan.com`,
    description: `Latest ${regionTitle} News Headlines`,
    robots: "index,follow", // ✅ Allow search engines to index this page
  };
}

// ✅ Main function to fetch and display articles based on region and pagination
export default async function RegionPage({ params, searchParams }: PageProps) {
  const region = params.region || "usa"; // ✅ Default to 'usa' if no region is provided
  const page = searchParams.page ? parseInt(searchParams.page) : 1; // ✅ Get current page, default to 1
  const limit = 10; // ✅ Number of articles to display per page
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // ✅ API Base URL (fallback to localhost)

  try {
    console.log(`Fetching articles for region: ${region}, Page: ${page}`);

    // ✅ Fetch articles from the API
    const res = await fetch(`${apiUrl}/api/articles?region=${region}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch articles");

    // ✅ Parse the response JSON
    const articles = await res.json();
    console.log("Fetched Articles Data:", articles);

    // ✅ If there are no articles, show a 404 page
    if (!articles.data || articles.data.length === 0) {
      console.warn("⚠️ No more articles.");
      notFound();
    }

    return (
      <main className="container mx-auto p-4">
        {/* ✅ Page Header */}
        <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>

        {/* ✅ Render the list of articles */}
        <ArticlesList articles={articles.data} />

        {/* ✅ Pagination Controls */}
        <div className="flex justify-between mt-6">
          {/* ✅ Previous Page Button (Only show if on page 2 or higher) */}
          {page > 1 && (
            <Link href={`/articles/${region}?page=${page - 1}`}>
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Previous</button>
            </Link>
          )}

          {/* ✅ Next Page Button (Only show if we have full `limit` articles, indicating more pages exist) */}
          {articles.data.length === limit && (
            <Link href={`/articles/${region}?page=${page + 1}`}>
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Next</button>
            </Link>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    notFound(); // ✅ Redirect to 404 if there's an error
  }
}

  
