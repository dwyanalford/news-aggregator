"use client";

import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {
    const section = document.getElementById("next-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-screen w-full bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/black-people-at-computer-office.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start px-6 md:px-20 text-white">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Amplifying <span className="text-green-500">Black</span> Voices
          {/* Delivering What <span className="text-green-500">Your Attention</span> Needs */}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl">
         The Black experience and perspective in America
        </p>
        <div className="flex gap-4">
          <Link
            href="/usa/business-and-finance"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition"
          >
            Start Reading
          </Link>
          <button
            onClick={handleScroll}
            className="bg-white text-black font-medium px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
