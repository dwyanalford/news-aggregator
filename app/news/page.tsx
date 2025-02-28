// pages/test-page.tsx

"use client";

export default function TestPage() {
  return (
    <div className="articles-container flex flex-wrap flex-row space-x-2 space-y-2 justify-center mt-3">
        <div className="article-container h-[300px] w-[430px] flex flex-col justify-between bg-green-400">
            <p className="article-category flex text-xs justify-end pt-3 pr-3">
                Pop Culture & Celebrities
            </p>

            <div className="flex flex-col p-2">
                <div className="flex mb-1">
                    <p className="article-date text-xs w-1/2">2/27/2025</p>
                </div>
                <h2 className="article-title leading-none line-clamp-3 overflow-hidden text-xl">
                    John Jackson Discovers a Dog in the Basement And Eat the Whole Shebang
                </h2>
                <div className="flex">
                    <p className="article-source w-4/5 mb-1 text-sm">Source:</p>
                    <button className="article-readmore w-1/5 text-sm">Read More</button>
                </div>
            </div>
        </div>
    </div>
  );
}