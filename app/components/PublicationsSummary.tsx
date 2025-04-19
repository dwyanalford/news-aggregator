"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionNavigator from "@/app/components/SectionNavigator";

interface Feed {
  name: string;
  logo?: string;
  url: string;
}

const PublicationsSummary = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchFeeds = async () => {
      const res = await fetch("/api/feeds");
      const json = await res.json();

      const allFeeds: Feed[] = json.data;
      setTotal(allFeeds.length);

      const randomSelection = allFeeds
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

      setFeeds(randomSelection);
    };

    fetchFeeds();
  }, []);

  return (
    <section
  id="pub-sum-section"
  className="
    w-fill h-screen
    flex flex-col items-center justify-center
    bg-cover bg-center
    bg-white dark:bg-gray-950
    text-center px-4
  "
  // style={{ backgroundImage: "url('/images/home/newsroom.webp')" }}
>


      {/* Heading */}
      <SectionNavigator
        watchId="pub-sum-section"
        hideOnSection="hero-section"
        prevId="value-prop-section"
        nextId="category-grid-section"
      />

      <div className="mb-16 px-4">
        <h2 className="text-4xl font-bold mb-10 dark:text-white">
          Black-owned Publications in Focus
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg xl:text-xl max-w-2xl xl:max-w-3xl mx-auto">
          We currently feature <span className="font-semibold">{total}</span> active publications.
        </p>
      </div>

      {/* Fixed 8 Logos in Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 sm:px-8 max-w-5xl mx-auto mb-8">
  {feeds.map((feed, idx) => (
    <Link href="/publications" key={idx}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-3 flex items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
        <Image
          src={feed.logo || feed.url}
          alt={`Logo ${idx}`}
          width={200}
          height={124}
          className="object-contain"
        />
      </div>
    </Link>
  ))}
</div>


      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/publications"
          className="bg-green-600 text-white/80 font-semibold text-xl px-6 py-4 rounded transition hover:bg-green-100 hover:text-black active:bg-green-800 active:text-white active:font-bold"
        >
          View All Publications
        </Link>
      </div>
    </section>
  );
};

export default PublicationsSummary;
