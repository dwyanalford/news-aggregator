// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Article, Category } from "@/app/types";
import CategorySidebar from "@/app/components/homepage/CategorySidebar";
import ScrollArrows from "@/app/components/homepage/ScrollArrows";
import PublicationTicker from "@/app/components/homepage/PublicationTicker";
import NewHeroSection from "@/app/components/homepage/NewHeroSection";
import QuotesSection from "@/app/components/homepage/QuotesSection";
import PopCultureSection from "@/app/components/homepage/PopCultureSection";
import FashionSection from "@/app/components/homepage/FashionSection";
import PoliticsSection from "@/app/components/homepage/PoliticsSection";
import EducationSection from "@/app/components/homepage/EducationSection";
import TravelFoodSection from "@/app/components/homepage/TravelFoodSection";
import MusicFilmSection from "@/app/components/homepage/MusicFilmSection";
import SportsSection from "@/app/components/homepage/SportsSection";
import ScienceTechSection from "@/app/components/homepage/ScienceTechSection";
import HealthWellnessSection from "@/app/components/homepage/HealthWellnessSection";
import BusinessFinanceSection from "@/app/components/homepage/BusinessFinanceSection";

const categories: Category[] = [
  { id: "hero", name: "back to top", icon: "ArrowUp", articles: [] },
  { id: "business", name: "business & finance", icon: "DollarSign", articles: [] },
  { id: "politics", name: "politics & law", icon: "Scale", articles: [] },
  { id: "health", name: "health & wellness", icon: "Heart", articles: [] },
  { id: "education", name: "education", icon: "GraduationCap", articles: [] },
  { id: "pop-culture", name: "pop culture & celebrities", icon: "Star", articles: [] },
  { id: "travel-food", name: "travel & food", icon: "Utensils", articles: [] },
  { id: "music-film", name: "music & film", icon: "Film", articles: [] },
  { id: "fashion", name: "fashion", icon: "Shirt", articles: [] },
  { id: "sports", name: "sports", icon: "Trophy", articles: [] },
  { id: "science-tech", name: "science & technology", icon: "Cpu", articles: [] },
  { id: "bottom", name: "go to bottom", icon: "ArrowDown", articles: [] },
];


export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categorizedArticles, setCategorizedArticles] = useState<{ [key: string]: Article[] }>({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/fetchRecentArticles"); // Replace with actual API endpoint
        const result = await response.json();
  
        if (!result || !Array.isArray(result.data)) {
          console.error("Invalid API response format:", result);
          return;
        }
  
        console.log("API Response:", result.data); // Debugging API response
  
        setArticles(result.data);
        organizeArticlesByCategory(result.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
  
    fetchArticles();
  }, []);
  

  const organizeArticlesByCategory = (articles: Article[]) => {
    const categoryMap: { [key: string]: Article[] } = {};
  
    articles.forEach((article) => {
      // Normalize category names
      const categoryKey = article.category.trim().toLowerCase();
  
      console.log(`Processing: ${article.title} → Category: ${article.category}`); // Debugging
  
      if (!categoryMap[categoryKey]) {
        categoryMap[categoryKey] = [];
      }
      categoryMap[categoryKey].push(article);
    });
  
    // Limit to 5 articles per category, except sports (9)
    for (const category in categoryMap) {
      categoryMap[category] = categoryMap[category].slice(0, category === "sports" ? 9 : 5);
    }
  
    console.log("Final categorized articles:", categoryMap); // ✅ Debugging
    setCategorizedArticles(categoryMap);
  };

  // Ensure we have articles before rendering sections
if (!articles.length) {
  return <p className="text-center text-white text-xl py-10">Loading articles...</p>;
}

// Debug: Ensure category names match
console.log("🛠️ Categories List:", categories.map(c => c.name));
console.log("🔥 Available Articles:", Object.keys(categorizedArticles));


  

  return (
    <main className="relative min-h-screen bg-background">
      <CategorySidebar
        categories={categories}
        activeSection={activeSection}
        onCategoryClick={(index) => {
          setIsScrolling(true);
          window.scrollTo({ top: sectionsRef.current[index]?.offsetTop || 0, behavior: "smooth" });
        }}
        
      />

      <ScrollArrows
        activeSection={activeSection}
        totalSections={categories.length}
        onScrollUp={() => setActiveSection((prev) => Math.max(0, prev - 1))}
        onScrollDown={() => setActiveSection((prev) => Math.min(categories.length - 1, prev + 1))}
      />

      <div ref={heroRef} className="min-h-screen snap-start">
        <NewHeroSection onExplore={() => setActiveSection(1)} />
      </div>

{categories.slice(1, -1).map((category, index) => (
  <div
    key={category.id}
    ref={(el) => {
      if (el) sectionsRef.current[index] = el;
    }}
    className="min-h-screen snap-start"
  >
    {category.name in categorizedArticles ? (
      (() => {
        console.log(`🔥 ${category.name} Section received:`, categorizedArticles[category.name]);
        switch (category.id) {
          case "pop-culture":
            return <PopCultureSection articles={categorizedArticles[category.name]} />;
          case "fashion":
            return <FashionSection articles={categorizedArticles[category.name]} />;
          case "politics":
            return <PoliticsSection articles={categorizedArticles[category.name]} />;
          case "health":
            return <HealthWellnessSection articles={categorizedArticles[category.name]} />;
          case "education":
            return <EducationSection articles={categorizedArticles[category.name]} />;
          case "travel-food":
            return <TravelFoodSection articles={categorizedArticles[category.name]} />;
          case "music-film":
            return <MusicFilmSection articles={categorizedArticles[category.name]} />;
          case "sports":
            return <SportsSection articles={categorizedArticles[category.name]} />;
          case "science-tech":
            return <ScienceTechSection articles={categorizedArticles[category.name]} />;
          case "business":
            return <BusinessFinanceSection articles={categorizedArticles[category.name]} />;
          default:
            return <p className="text-white">No articles found for this section.</p>;
        }
      })()
    ) : (
      <p className="text-white">No articles found.</p>
    )}
  </div>
))}


      <div ref={bottomRef}>
        <QuotesSection />
        <div className="py-20 bg-background">
          <h2 className="text-4xl font-bold text-center mb-10">Your Hub for Stories from Leading Publications</h2>
          <PublicationTicker />
        </div>
      </div>
    </main>
  );
}
