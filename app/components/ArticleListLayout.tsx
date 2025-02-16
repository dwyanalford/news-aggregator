"use client";

import { ReactNode } from "react";

interface ArticleListLayoutProps {
  children: ReactNode;
}

export default function ArticleListLayout({ children }: ArticleListLayoutProps) {
  return (
    <div className="flex mt-[100px]">
      {/* Sidebar Placeholder */}
      <aside className="w-72 bg-gray-300 p-4 fixed shadow-lg border border-gray-200 h-full">
        <h2 className="font-bold mb-4">Filters</h2>
        <p>Sidebar placeholder – filtering options will go here.</p>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[350px] p-2">
        {/* children can be anything, including your ArticleList */}
        {children}
      </main>
    </div>
  );
}