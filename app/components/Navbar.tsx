// components/Navbar.tsx
"use client";

import Link from 'next/link';
import ActiveLink from './ActiveLink';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // State for managing menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Menu Toggle Button (Navbar Drawer) - Visible on smaller screens */}
      <button onClick={toggleMenu} className="fixed top-2 left-4 z-50 lg:hidden bg-gray-200 p-4 rounded-md shadow-lg">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Navbar */}
      <nav className="bg-gray-200 p-9 lg:p-4 shadow-lg fixed top-0 left-0 w-full z-40">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Site Name */}
          <div className="text-gray-800 text-2xl font-bold fixed top-4 left-1/2 transform -translate-x-1/2 lg:left-16 lg:transform-none z-50">
            <Link href="/">Dwyan</Link>
          </div>

          {/* Main Menu Links */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } flex flex-col z-40 top-10 left-0 right-0 bg-gray-200 p-4 space-y-4 w-52 lg:w-full lg:flex lg:justify-end lg:space-x-6 lg:flex-row lg:space-y-0 mt-8 lg:mt-0 fixed lg:static lg:p-0 shadow-lg lg:shadow-none overflow-auto lg:overflow-hidden`}
          >
            {/* Home Link */}
            <ActiveLink href="/">Home</ActiveLink>

            {/* News Link */}
            <ActiveLink href="/news">News</ActiveLink>

            {/* Events */}
            <ActiveLink href="/events">Events</ActiveLink>

            {/* About Link */}
            <ActiveLink href="/about">About</ActiveLink>

            {/* Contact Link */}
            <ActiveLink href="/contact">Contact</ActiveLink>          

            {/* Login Link */}
            <ActiveLink href="/login">Login</ActiveLink>

            {/* Register Link */}
            <ActiveLink href="/register">Register</ActiveLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
