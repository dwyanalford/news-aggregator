// app/components/SidebarLayout.tsx

"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';

interface SidebarLayoutProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode; // Content passed from NewsMenu or TagFilterMenu
}

export default function SidebarLayout({ isSidebarOpen, toggleSidebar, children }: SidebarLayoutProps) {
  return (
    <div>
      {/* Sidebar Toggle Button for Mobile */}
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="lg:hidden mb-4 p-2 fixed top-4 right-4 z-40">
          <FontAwesomeIcon icon={faFilter} size="xl" className="lg:hidden mb-4 p-2 fixed top-4 right-4 z-50" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 lg:left-0 w-72 bg-gray-200 h-screen p-4 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 z-40 overflow-y-auto mt-[70px]`}
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={toggleSidebar} className="lg:hidden ml-auto">
            <FontAwesomeIcon icon={faTimes} size="xl" />
          </button>
        </div>

        {/* Render dynamic content */}
        {children}

      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}
