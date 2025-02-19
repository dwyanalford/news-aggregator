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
    <div className="fixed mt-[85px] h-[110px] ml-[280px] w-full z-40 top-0 overflow-hidden bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {selectedPublication ? (
        <div className="flex flex-row justify-start items-center p-4">
          {/* Logo Wrapper */}
          <div className="mr-4 flex items-center justify-center">
            <Image
              src={selectedPublication.logo}
              alt={selectedPublication.name}
              width={50}
              height={50}
              className="rounded-full object-cover min-h-[50px] min-w-[50px]"
            />
          </div>
  
          {/* Text Wrapper */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{selectedPublication.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{selectedPublication.purpose}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center p-4">
          <span className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide shadow-md mr-4">
            LATEST
          </span>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Articles and News</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
