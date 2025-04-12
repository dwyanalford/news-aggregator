// app/page.tsx
import React from 'react';
import Link from 'next/link';
import CategoryGrid from '@/app/components/CategoryGrid';
import ValueProposition from '@/app/components/ValueProposition';

export default function Homepage() {
  return (
    <div className="w-full">

      {/* 1. Hero Section */}
      <section
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/black-people-at-computer-office.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delivering What Your Attention Needs
          </h1>
          <p className="text-lg md:text-2xl mt-2 mb-6">
            The Black experience and perspective in America
          </p>
          <Link
            href="/articles"
            className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-100 transition mt-2"
          >
            Explore Articles
          </Link>
        </div>
      </section>

      {/* 2. Value Proposition Section */}
      <ValueProposition/>

      {/* 3. Featured Categories */}
      <CategoryGrid/>

      {/* 4. Black Media in Focus */}
      <section className="py-16 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Black Media in Focus</h2>
        <p className="text-center mb-8">
          Highlighting the active Black-owned publications powering this platform.
        </p>
        <div className="overflow-x-auto whitespace-nowrap flex space-x-4 items-center pb-4">
          {["thegriot", "blackenterprise", "atlantavoice", "blavity"].map((logo) => (
            <Link key={logo} href="/publications">
              <img
                src={`/logos/${logo}.png`}
                alt={logo}
                className="h-20 w-auto inline-block rounded shadow-md"
              />
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/publications"
            className="text-blue-600 hover:underline font-semibold"
          >
            View All Publications
          </Link>
        </div>
      </section>

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
