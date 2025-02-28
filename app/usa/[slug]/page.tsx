// usa/[slug]/page.tsx
import ArticleImage from '@/app/components/ArticleImage';
import { Article } from '@/app/types';



export default async function SlugTestPage({ params }: { params: { slug: string } }) {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/fetchRecentArticles?slug=${params.slug}`, {
    cache: 'no-store',  // <--- Add this
  });
  const data = await res.json();
  const articles: Article[] = data.data || [];

  return (
    <div className="articles-container flex flex-wrap flex-row space-x-2 space-y-2 justify-center mt-3">
      {articles.map((article: Article) => (
        <div
          key={article.id}
          className="article-container h-[300px] w-[430px] flex flex-col justify-between"
        >
            <ArticleImage src={article.imageURL} alt={article.title} />
          <div className="relative z-10 p-2 text-white">
            <p className="article-category flex text-xs justify-end pt-3 pr-3">
              {article.category}
            </p>
            <div className="flex flex-col p-2">
              <div className="flex mb-1">
                <p className="article-date text-xs w-1/2">{article.date}</p>
              </div>
              <h2 className="article-title leading-none line-clamp-3 overflow-hidden text-xl">
                {article.title}
              </h2>
              <div className="flex">
                <p className="article-source w-4/5 mb-1 text-sm">
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

