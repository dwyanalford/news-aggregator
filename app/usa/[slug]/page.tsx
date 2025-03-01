// usa/[slug]/page.tsx

import { Article } from '@/app/types';


export default async function SlugTestPage({ params }: { params: { slug: string } }) {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/fetchRecentArticles?slug=${params.slug}`, {
    cache: 'no-store',  // <--- Add this
  });
  const data = await res.json();
  const articles: Article[] = data.data || [];

  return (
    <div className="articles-container flex flex-wrap gap-4 justify-center mt-3">
      {articles.map((article: Article) => (
        <div
          key={article.id}
          className="article-container h-[300px] w-[430px] flex flex-col justify-between bg-cover bg-center relative rounded-lg shadow-lg transition-all duration-500 hover:rotate-1 hover:scale-110 hover:shadow-2xl hover:brightness-90 hover:backdrop-blur-md hover:-translate-y-2 hover:-skew-x-1"
          style={{ backgroundImage: `url(${article.imageURL})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-lg shadow-lg transition-opacity duration-500 hover:bg-black/20"></div>

          <div className="article-text absolute inset-0 flex flex-col justify-between z-10 p-2 text-gray-200">
            <p className="article-category flex text-xs justify-end pt-3 pr-3">
              {article.category}
            </p>
            <div className="flex flex-col p-2">
              <div className="flex mb-0">
                <p className="article-date text-xs w-1/2">{new Date(article.date).toLocaleDateString("en-US")}</p>
              </div>
              <h2 className="article-title leading-tight line-clamp-3 overflow-hidden text-lg shadow-xl">
                {article.title}
              </h2>
              <div className="flex">
                <p className="article-source w-4/5 text-xs">
                  Source: {article.source}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-readmore w-1/5 text-sm"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

