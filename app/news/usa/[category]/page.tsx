// app/news/usa/[category]/page.tsx

import NewsContainer from '@/app/components/NewsContainer';
import NewsContent from '@/app/components/NewsContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Import USA category-specific data files
import businessData from '@/app/data/usa/businessData';
import cryptoData from '@/app/data/usa/cryptoData';
import healthData from '@/app/data/usa/healthData';
import technologyData from '@/app/data/usa/techData';
import sportsData from '@/app/data/usa/sportsData'
import politicsData from '@/app/data/usa/politicsData'
import lifestyleData from '@/app/data/usa/lifestyleData'
import entertainmentData from '@/app/data/usa/entertainmentData'

const categoryData: { [key: string]: any } = {
  business: businessData,
  crypto: cryptoData,
  health: healthData,
  tech: technologyData,
  sports: sportsData,
  politics: politicsData,
  lifestyle: lifestyleData,
  entertainment: entertainmentData
};

interface PageProps {
  params: { category: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = params.category;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `USA News - ${categoryTitle} - dwyan.com`,
    description: `Latest USA News on ${categoryTitle}`,
    robots: 'index,follow',
  };
}

export default function USACategoryPage({ params }: PageProps) {
  const category = params.category;
  const data = categoryData[category];

  // Redirect to 404 if the category does not exist
  if (!data) {
    notFound();
  }

  return (
    <>
      <NewsContainer>
        <NewsContent sources={data} region="usa" /> {/* Pass region as "usa" */}
      </NewsContainer>
    </>
  );
}
