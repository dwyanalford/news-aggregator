"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]); // Redirect on status change

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while checking the session
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>
      <p className="text-lg text-gray-700 mb-8">
        Welcome, {session?.user?.name}! This is your user dashboard.
      </p>

      {/* Additional dashboard content goes here */}
      <div className="p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Saved Articles</h2>
        <p className="text-gray-600">
          Here you can view and manage your saved articles and tags.
        </p>
        {/* Placeholder for saved articles and tags */}
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
