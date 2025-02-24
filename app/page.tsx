// app/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import NewsSection from "@/app/components/homepage/NewsSection";
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

const categories = [
  {
    id: "hero",
    name: "Back to Top",
    icon: "ArrowUp",
  },
  {
    id: "business",
    name: "Business & Finance",
    icon: "DollarSign",
    articles: [
      {
        title: "Black-Owned Businesses See Historic Growth Despite Economic Challenges",
        publication: "Bloomberg Business",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1"
      },
      {
        title: "New Investment Fund Focuses on African-American Entrepreneurs",
        publication: "Financial Times",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9"
      },
      {
        title: "Tech Startups in Atlanta's Growing Innovation Hub",
        publication: "TechCrunch",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
      },
      {
        title: "The Rise of Black-Owned Financial Technology Companies",
        publication: "Forbes",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d"
      },
      {
        title: "Corporate Diversity Initiatives Show Promising Results",
        publication: "Wall Street Journal",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
      }
    ]
  },
  {
    id: "politics",
    name: "Politics & Law",
    icon: "Scale",
    articles: [
      {
        title: "Historic Voting Rights Legislation Advances in Congress",
        summary: "Landmark bill aims to strengthen voter protections and ensure equal access to polls nationwide",
        publication: "Washington Post",
        image: "https://images.unsplash.com/photo-1575320181282-9afab399332c"
      },
      {
        title: "Supreme Court to Hear Major Civil Rights Case",
        summary: "Justices will review precedent-setting case on educational equity and access",
        publication: "The New York Times",
        image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9"
      },
      {
        title: "New State Laws Address Police Reform",
        summary: "Comprehensive legislation focuses on accountability and community relations",
        publication: "NPR",
        image: "https://images.unsplash.com/photo-1591676669277-a2fd45bb69ba"
      },
      {
        title: "Local Leaders Push for Environmental Justice",
        summary: "Coalition demands action on climate impact in urban communities",
        publication: "Reuters",
        image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1"
      },
      {
        title: "Justice Department Announces Civil Rights Initiative",
        summary: "Federal program to address systemic inequalities in legal system",
        publication: "Associated Press",
        image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c"
      }
    ]
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: "Heart",
  },
  {
    id: "education",
    name: "Education",
    icon: "GraduationCap",
  },
  {
    id: "pop-culture",
    name: "Pop Culture & Celebrity",
    icon: "Star",
    articles: [
      {
        title: "Rising Stars: New Generation of Black Talent Reshaping Hollywood",
        publication: "Variety",
        image: "https://images.unsplash.com/photo-1521119989659-a83eee488004",
        author: "Marcus Johnson",
        category: "Entertainment"
      },
      {
        title: "Breaking Records: Hip-Hop Artists Dominate Global Charts",
        publication: "Billboard",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        author: "Sarah Williams",
        category: "Music"
      },
      {
        title: "Fashion Forward: Black Designers Lead Industry Innovation",
        publication: "Vogue",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        author: "Michelle Chen",
        category: "Fashion"
      },
      {
        title: "Social Media Influencers Redefining Digital Culture",
        publication: "Complex",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
        author: "David Thompson",
        category: "Digital"
      },
      {
        title: "Award Season: Historic Wins Celebrate Diverse Talent",
        publication: "Entertainment Weekly",
        image: "https://images.unsplash.com/photo-1586899028174-e7098604235b",
        author: "Rachel Martinez",
        category: "Awards"
      }
    ]
  },
  {
    id: "travel-food",
    name: "Travel & Food",
    icon: "Utensils",
  },
  {
    id: "music-film",
    name: "Music & Film",
    icon: "Film",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    articles: [
      {
        title: "Sustainable Fashion Takes Center Stage in Urban Design",
        publication: "Vogue",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926",
        summary: "Leading designers embrace eco-friendly materials and ethical production."
      },
      {
        title: "Emerging Designers Redefine Contemporary Style",
        publication: "Fashion Weekly",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        summary: "New wave of talent brings fresh perspective to modern fashion."
      }
    ]
  },
  {
    id: "sports",
    name: "Sports",
    icon: "Trophy",
  },
  {
    id: "science-tech",
    name: "Science & Technology",
    icon: "Cpu",
  },
  {
    id: "bottom",
    name: "Go to Bottom",
    icon: "ArrowDown",
  }
];

interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary?: string;
  imageURL?: string;
  author: string;
  source: string;
  category: string;
  region?: string;
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  
  
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const currentPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const sections = [heroRef.current, ...sectionsRef.current];
      
      if (currentPosition + windowHeight >= documentHeight - 100) {
        setActiveSection(categories.length - 1);
        return;
      }
      
      let currentSection = 0;
      sections.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop - windowHeight / 3;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
          currentSection = index;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const scrollToSection = (index: number) => {
    setIsScrolling(true);
    
    if (index === categories.length - 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    } else {
      const sections = [heroRef.current, ...sectionsRef.current];
      if (sections[index]) {
        window.scrollTo({
          top: sections[index]?.offsetTop || 0,
          behavior: "smooth"
        });
      }
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles"); // Replace with your actual endpoint
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);



  return (
    <main className="relative min-h-screen bg-background">
      <CategorySidebar 
        categories={categories} 
        activeSection={activeSection} 
        onCategoryClick={(index) => scrollToSection(index)} 
      />
      
      <ScrollArrows 
        activeSection={activeSection}
        totalSections={categories.length}
        onScrollUp={() => scrollToSection(Math.max(0, activeSection - 1))}
        onScrollDown={() => scrollToSection(Math.min(categories.length - 1, activeSection + 1))}
      />

      <div ref={heroRef} className="min-h-screen snap-start">
        <NewHeroSection onExplore={() => scrollToSection(1)} />
      </div>

      {categories.slice(1, -1).map((category, index) => (
        <div
          key={category.id}
          ref={(el) => el && (sectionsRef.current[index] = el)}
          className="min-h-screen snap-start"
        >
          {category.id === 'pop-culture' ? (
            <PopCultureSection articles={category.articles} />
          ) : category.id === 'fashion' ? (
            <FashionSection />
          ) : category.id === 'politics' ? (
            <PoliticsSection articles={category.articles} />
          ) : category.id === 'health' ? (
            <HealthWellnessSection />
          ) : category.id === 'education' ? (
            <EducationSection />
          ) : category.id === 'travel-food' ? (
            <TravelFoodSection />
          ) : category.id === 'music-film' ? (
            <MusicFilmSection />
          ) : category.id === 'sports' ? (
            <SportsSection />
          ) : category.id === 'science-tech' ? (
            <ScienceTechSection />
          ) : (
            <NewsSection category={category} />
          )}
        </div>
      ))}

      <div ref={bottomRef}>
        <QuotesSection />
        <div className="py-20 bg-background">
          <h2 className="text-4xl font-bold text-center mb-10">
            Your Hub for Stories from Leading Publications
          </h2>
          <PublicationTicker />
        </div>
      </div>
    </main>
  );
}
