'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FileText, ShieldCheck, Users } from 'lucide-react';
import React from 'react';

const valueProps = [
  {
    title: 'Daily Insights',
    description:
      'Fresh perspectives and news updated daily—ensuring you never miss what is going on in our communities across America.',
    icon: FileText,
  },
  {
    title: 'Verified Sources',
    description:
      'Content is aggregated, for your convenience, from active Black-owned publications, ensuring authentic voices and perspectives.',
    icon: ShieldCheck,
  },
  {
    title: 'Community First',
    description:
      'Join a vibrant community of readers and thinkers who share your passion for authentic stories.',
    icon: Users,
  },
];

const ValueProposition = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });
  }, []);

  return (
    <section id="next-section" className="py-24 bg-gray-50 text-center">
      {/* Heading */}
      <div className="mb-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        Curated. Reliable. Relevant. Get your news at a glance! Our goal is simple: bring the stories that shape Black America to your fingertips, through a platform you can count on every day.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
        {valueProps.map(({ title, description, icon: Icon }, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl p-8 text-left shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="bg-green-100 text-green-600 rounded-xl p-4 inline-block mb-6 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:animate-pulse">
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
