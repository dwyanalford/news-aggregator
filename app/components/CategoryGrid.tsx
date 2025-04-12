'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  GraduationCap,
  Shirt,
  HeartPulse,
  Music,
  Landmark,
  Users,
  Cpu,
  Trophy,
  Plane,
} from 'lucide-react';

interface Article {
  category: string;
  imageURL: string;
  slug: string;
}

type CategoryMap = Record<string, { imageURL: string; slug: string }>;

const categoryIcons: Record<string, React.ElementType> = {
  'business-and-finance': Briefcase,
  'education': GraduationCap,
  'fashion': Shirt, // if used
  'health-and-wellness': HeartPulse,
  'music-and-film': Music,
  'politics-and-law': Landmark,
  'pop-culture-and-celebrities': Users,
  'science-and-technology': Cpu,
  'sports': Trophy,
  'travel-and-food': Plane,
};


const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<CategoryMap>({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/fetchRecentArticles');
        const json = await res.json();
        const articles: Article[] = json.data;

        console.log('🔍 Category/Slug Map:', articles.map(a => `${a.category} → ${a.slug}`));


        const latestByCategory: CategoryMap = {};
        for (const article of articles) {
          if (!latestByCategory[article.category]) {
            latestByCategory[article.category] = {
              imageURL: article.imageURL,
              slug: article.slug,
            };
          }
        }

        setCategories(latestByCategory);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="py-16 bg-white px-8">
      <h2 className="text-4xl font-bold text-center mb-12 mt-4 p-4">Browse by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12">
        {Object.entries(categories).map(([category, { imageURL, slug }]) => {
          const Icon = categoryIcons[slug];
          if (!Icon) return null; // ensure only mapped slugs are shown

          return (
            <Link
              key={category}
              href={`/usa/${slug}`}
              className="relative rounded-xl overflow-hidden shadow-lg group h-48 sm:h-56 md:h-64 transition-transform transform hover:scale-[1.02]"
            >
              <img
                src={imageURL}
                alt={category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition duration-300" />

              {/* Centered icon + text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                <Icon className="w-10 h-10 mb-2 text-white group-hover:text-green-400 transition duration-300" />
                <span className="text-white text-3xl font-semibold text-shadow capitalize">
                  {category}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
