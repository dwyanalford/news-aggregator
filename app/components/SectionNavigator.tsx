"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  prevId?: string;
  nextId?: string;
  watchId: string; // section that triggers visibility
  hideOnSection?: string; // section where nav should be hidden (e.g. hero)
}

const SectionNavigator = ({ prevId, nextId, watchId, hideOnSection }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const watch = document.getElementById(watchId);
    const hide = hideOnSection ? document.getElementById(hideOnSection) : null;

    if (!watch) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show nav when "watch" section is visible and "hide" section is NOT
        if (hide) {
          const rect = hide.getBoundingClientRect();
          const hideIsVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
          setVisible(entry.isIntersecting && !hideIsVisible);
        } else {
          setVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(watch);

    return () => observer.disconnect();
  }, [watchId, hideOnSection]);

  if (!visible) return null;

  const handleScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (targetId === nextId) {
        target.classList.add("fade-in-up");
        setTimeout(() => target.classList.remove("fade-in-up"), 800);
      }
      

    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
      {prevId && (
        <button
          onClick={() => handleScroll(prevId)}
          className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition active:bg-green-800"
        >
          <ArrowLeft className="w-4 h-4" />
          PREV
        </button>
      )}
      {nextId && (
        <button
          onClick={() => handleScroll(nextId)}
          className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition active:bg-green-800"
        >
          LEARN MORE
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SectionNavigator;
