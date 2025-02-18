"use client";

import Image from "next/image"; // <-- Added for logo
import { useState } from "react";

interface Publication {
  name: string;
  logo: string;  
  purpose: string;
}

interface ArticleHeaderProps {
  totalArticles: number;
  todayDate: string;
  selectedPublication?: Publication;
}

export default function ArticleHeader({ totalArticles, todayDate, selectedPublication }: ArticleHeaderProps) {
  console.log("Rendering ArticleHeader...");

  return (
    <div className="fixed top-[90px] w-full bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 z-40">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        {selectedPublication ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={selectedPublication.logo}
                alt={selectedPublication.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <h1 className="text-2xl font-bold">{selectedPublication.name}</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPublication.purpose}</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide shadow-md">
              LATEST
            </span>
            <h1 className="text-2xl font-bold">News Articles</h1>
          </div>
        )}
      </div>
    </div>
  );
}