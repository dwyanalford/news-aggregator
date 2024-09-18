// app/dashboard/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SavedArticles from "@/app/components/SavedArticles";  // Import the SavedArticles component
import Loading from "@/app/components/Loading";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]); // Redirect on status change

  if (status === "loading") {
    return <Loading isLoading={true}  />;  // Use your custom Loading component here
  }

  return (
    <div className="container mx-auto p-8 bg-gray-200">
      <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>
      <p className="text-xl font-light text-gray-700 mb-8">
        Welcome, {session?.user?.name}! This is your user dashboard.
      </p>

      {/* Display Saved Articles */}
      <div className="p-6 border rounded-lg shadow-lg bg-gray-200">
        <h2 className="text-2xl font-light mb-4">Your Saved Articles</h2>
        {/* Use the SavedArticles component here */}
        <SavedArticles />
      </div>

      {/* Logout Button */}
      <button
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
