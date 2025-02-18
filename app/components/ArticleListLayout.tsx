"use client";

import { ReactNode } from "react";

interface ArticleListLayoutProps {
  children: ReactNode;
}

export default function ArticleListLayout({ children }: ArticleListLayoutProps) {
  return (
    // bg-blue-100
    <div className="flex flex-wrap justify-center gap-6 p-6 min-h-screen mt-[80px] dark:text-gray-100 dark:bg-gray-900 bg-yellow"> 
      {/* Debugging Background - Will be removed later */}
      <div className="w-full p-4 rounded-md">
      </div>

      {/* Articles Section */}
      <div className="flex flex-wrap gap-6 w-full p-6 rounded-md">
        {children}
      </div>
    </div>
  );
}