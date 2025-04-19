"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FileText, ShieldCheck, Users } from "lucide-react";
import React from "react";
import SectionNavigator from "@/app/components/SectionNavigator";

const valueProps = [
  {
    title: "Daily Insights",
    description:
      "News content updated Daily - Fresh perspectives, be in the know and become knowledgable about the community. ",
    icon: FileText,
  },
  {
    title: "Reliable Sources",
    description:
      "News content is aggregated and categorized, for your convenience, from active Black-focused publications.",
    icon: ShieldCheck,
  },
  {
    title: "Sign up. It's Free",
    description:
      "Register to unlock more useful features and enhance your overall experience with the dwyan app.",
    icon: Users,
  },
];

const ValueProposition = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-out-cubic" });
  }, []);

  return (
<section
  id="value-prop-section"
  className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-center text-white flex items-end justify-center pb-12 xl:pb-24"
  style={{
    backgroundImage: "url('/images/home/pub-summary-bg-image.webp')",
  }}
>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
      <SectionNavigator
        watchId="value-prop-section"
        hideOnSection="hero-section"
        prevId="hero-section"
        nextId="pub-sum-section"
      />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto ">

          {valueProps.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={idx}
              className="group rounded-2xl p-8 text-left transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-500 shadow-[0_0_60px_rgba(0,0,0,0.7)] bg-black/30 backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="bg-green-600 text-green-100 rounded-xl p-4 inline-block mb-6 transition-all duration-300 group-hover:bg-green-100 group-hover:text-black">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white/85 group-hover:text-green-500">{title}</h3>
              <p className="text-white/60 text-lg leading-relaxed group-hover:text-white">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
