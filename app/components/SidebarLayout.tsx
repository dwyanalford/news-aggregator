"use client";

import { useEffect, useCallback, useState, type ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Close sidebar on Escape key
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  // Auto-open on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex z-50 transition-all duration-300 ${isOpen ? "mr-[350px]" : "mr-[100px]"}`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-gray-100 text-gray-600 shadow-md hover:text-blue-600 transition-all duration-300 ${
          isOpen ? "translate-x-[280px] rounded-r-md" : "translate-x-0 rounded-r-md"
        }`}
        aria-label="Toggle Sidebar"
      >
        <FaChevronRight className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-[70px] left-0 h-[calc(100vh-4rem)] w-[280px] bg-gray-100 border-r border-gray-300 transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto py-6 px-4">{children}</div>
      </aside>

      {/* Mobile Overlay (Backdrop) */}
      <div
        onClick={toggleSidebar}
        className={`md:hidden fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}