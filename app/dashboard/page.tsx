// app/dashboard/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SavedArticles from "@/app/components/SavedArticles";
import TagFilterMenu from "@/app/components/TagFilterMenu";
import { fetchUserTags } from '@/app/utils/fetchUserTagsUtils';
import Loading from "@/app/components/Loading";
import axios from "axios";

// Define the Article type
interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL: string;
  tags: string[];  // Assuming each article has a `tags` array containing tag names
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string>('ALL');  // State to manage the selected tag
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);  // Sidebar open/close state
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);  // Function to toggle sidebar
  const [articles, setArticles] = useState<Article[]>([]);  // State for all saved articles
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);  // State for filtered articles
  const [userTags, setUserTags] = useState<{ id: string, name: string, count: number }[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  const handleTagClick = async (tagName: string) => {
    setSelectedTag(tagName);  // Highlight the selected tag

    if (tagName === 'ALL') {
      // If 'ALL' is clicked, reset the filteredArticles to show all saved articles
      setFilteredArticles(articles);
      return;
    }

    try {
      // Make an API request to fetch articles for the clicked tag using axios
      const response = await axios.get(`/api/articles/filter-by-tag?tagName=${tagName}`);
      if (response.status === 200) {
        const filteredArticles = response.data;  // Get filtered articles
        setFilteredArticles(filteredArticles);  // Update state with filtered articles
      } else {
        console.error('Failed to fetch articles:', response.status);
      }
    } catch (error) {
      console.error('Error fetching filtered articles:', error);
    }
};

   // Fetch all user tags when the component loads
   useEffect(() => {
    fetchUserTags()
      .then((tags) => {  // No need for response.json(), fetchUserTags already returns Tag[]
        setUserTags(tags);  // Use the `tags` array directly
      })
      .catch((error) => {
        console.error('Error fetching user tags:', error);  // Error handling
      });
  }, []);

  useEffect(() => {
    setFilteredArticles(articles); // Sync filteredArticles with articles when articles are updated
  }, [articles]);  
  
  
  useEffect(() => {
    if (session) {
      // Fetch saved articles from the backend
      fetch('/api/articles/getSaved')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch saved articles');
          }
          return response.json();
        })
        .then((data) => {
          // Ensure each article has a `tags` array
          const articlesWithTags = data.map((article: any) => ({
            ...article,
            tags: article.tags || [],  // Ensure tags is an array, even if empty
          }));
  
          setArticles(articlesWithTags);  // Set all saved articles
          setFilteredArticles(articlesWithTags);  // Set filtered articles to show all initially
          setTotalArticles(articlesWithTags.length);  // Set total count of saved articles
        })
        .catch((error) => {
          console.error('Failed to fetch articles:', error);
        });
    }
  }, [session]);
   

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]); // Redirect on status change

  // Function to handle article removal
  const handleArticleRemove = (link: string) => {
    setArticles(prevArticles => prevArticles.filter(article => article.link !== link));
    setFilteredArticles(prevFiltered => prevFiltered.filter(article => article.link !== link));
  };

  if (status === "loading") {
    return <Loading isLoading={true}  />;  // Use your custom Loading component here
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar for Tag Filtering */}
        <div className={`fixed top-0 right-0 lg:left-0 w-72 bg-gray-200 h-screen p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 z-40 overflow-y-auto overflow-x-hidden mt-[70px]`}>
          <TagFilterMenu
            tags={userTags}  // This will be fetched and populated using fetchUserTags
            setUserTags={setUserTags}  // Pass setUserTags to the sidebar
            onFilter={handleTagClick}  // Function to handle filtering based on selected tag
            isSidebarOpen={isSidebarOpen}  // Sidebar open/close state
            toggleSidebar={toggleSidebar}  // Function to toggle sidebar
            totalArticles={totalArticles}  // Pass total article count here
          />
        </div>
      </div>

      <div className="container mx-auto p-8 bg-gray-200 ml-80">
        <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>
        <p className="text-xl font-light text-gray-700 mb-8">
          Welcome, {session?.user?.name}! This is your user dashboard.
        </p>

        {/* Display Saved Articles */}
        <div className="p-6 border rounded-lg shadow-lg bg-gray-200">
          <h2 className="text-2xl font-light mb-4">Your Saved Articles</h2>
          {/* Use the SavedArticles component here */}
          <SavedArticles 
          userTags={userTags}   // This will be fetched and populated using fetchUserTags
          setUserTags={setUserTags}  // Pass setUserTags to the sidebar
          fetchUserTags={fetchUserTags} 
          filteredArticles={filteredArticles}
          handleArticleRemove={handleArticleRemove}
          setTotalArticles={setTotalArticles} 
           />
        </div>

        {/* Logout Button */}
        <button
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default DashboardPage;
