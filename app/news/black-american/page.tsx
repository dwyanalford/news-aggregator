// app/news/black-american/page.tsx

import NewsContainer from '@/app/components/NewsContainer';
import NewsContent from '@/app/components/NewsContent';
import blackAmericanData from '@/app/data/blackAmericanData';
import RegionMenu from '@/app/components/RegionMenu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Black American News - dwyan.com',
  description: 'Latest Black American News Headlines',
  robots: 'index,follow',
};

export default function BlackAmericanNews() {
  return (
    <>
      <NewsContainer>
      <RegionMenu />
      <NewsContent sources={blackAmericanData} />
      </NewsContainer>
    </>
  );
}
