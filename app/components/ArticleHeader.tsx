"use client";

interface ArticleHeaderProps {
  totalArticles: number;
  todayDate: string;
}

export default function ArticleHeader({ totalArticles, todayDate }: ArticleHeaderProps) {
  console.log("Rendering ArticleHeader...");
  console.log(`Today's Date: ${todayDate}`);
  console.log(`Total Articles: ${totalArticles}`);

  return (
    <div className="fixed top-[68px] w-full bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 z-40">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Latest News Section */}
        <div className="flex items-center gap-3">
          <span className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide shadow-md">
            LATEST
          </span>
          <h1 className="text-2xl font-bold">News Articles</h1>
        </div>

        {/* Date and Total Articles */}
        <div className="text-sm">
          <span>{todayDate}</span>
        </div>
      </div>
    </div>
  );
}