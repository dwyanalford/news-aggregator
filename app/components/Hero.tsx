"use client";

import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {
    const section = document.getElementById("value-prop-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
    id="hero-section"
      className="relative h-screen w-full bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/black-people-at-computer-office.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center px-6 md:px-20">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-white/80">
          Amplifying <span className="text-green-500">Black</span> Voices
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-16 max-w-xl xl:max-w-2xl text-white/80">
         The Black experience and perspective in America
        </p>
        <div className="flex gap-4">
          <button
  onClick={handleScroll}
  className="bg-green-600 text-white/80 font-semibold text-xl px-6 py-4 rounded transition hover:bg-green-100 hover:text-black active:bg-green-800 active:text-white active:font-bold"
>
  LEARN MORE
</button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
