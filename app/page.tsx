// app/page.tsx
import React from 'react';
import Link from 'next/link';
import CategoryGrid from '@/app/components/CategoryGrid';
import ValueProposition from '@/app/components/ValueProposition';
import Hero from '@/app/components/Hero';
import PublicationsSummary from "@/app/components/PublicationsSummary";

export default function Homepage() {
  return (
    <div className="w-full">
      <Hero/>
      <ValueProposition/>
      <PublicationsSummary />
      <CategoryGrid/>

      {/* 5. Call to Action */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Stay Connected?</h2>
        <p className="mb-6">
          Sign up free to start saving articles and customizing your news experience.
        </p>
        <Link
          href="/signup"
          className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Sign Up Free
        </Link>
      </section>
    </div>
  );
}
