// app/news/[region]/page.tsx

import NewsContainer from '@/app/components/NewsContainer';
import NewsContent from '@/app/components/NewsContent';
import { Metadata } from 'next';
import blackAmericanData from '@/app/data/blackAmericanData';
import africaData from '@/app/data/africaData';
import ukData from '@/app/data/ukData';
import { notFound } from 'next/navigation';

// Map regions to their corresponding data files
const regionData: { [key: string]: any } = {
  blackamerican: blackAmericanData,
  africa: africaData,
  uk: ukData,
};

interface PageProps {
  params: { region: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const region = params.region;
  const regionTitle = region.charAt(0).toUpperCase() + region.slice(1);

  return {
    title: `${regionTitle} News - dwyan.com`,
    description: `Latest ${regionTitle} News Headlines`,
    robots: 'index,follow',
  };
}

export default function RegionPage({ params }: PageProps) {
  const region = params.region; // Extract the region from URL params
  const data = regionData[region]; // Get the data based on the region

  // Redirect to 404 if the region does not exist
  if (!data) {
    notFound();
  }

  return (
    <>
      <NewsContainer>
        <NewsContent sources={data} region={region} /> {/* Pass region-specific data */}
      </NewsContainer>
    </>
  );
}
