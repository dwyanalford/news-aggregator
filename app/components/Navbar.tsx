// app/components/Navbar.tsx

"use client";

import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobeAfrica,
  faGlobeAmericas,
  faGlobeEurope,
  faHeartbeat,
  faBriefcase,
  faMicrochip,
  faLandmark,
  faFutbol,
  faCouch,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { status } = useSession(); // Check session status for authenticated state
  const [isNewsMenuOpen, setIsNewsMenuOpen] = useState(false); // Dropdown toggle state

  const toggleNewsMenu = () => {
    setIsNewsMenuOpen(!isNewsMenuOpen);
  };

  return (
    <nav className="bg-gray-200 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="text-gray-800 text-2xl font-bold">
          <Link href="/">Dwyan</Link>
        </div>

        {/* Menu Section */}
        <div className="flex space-x-6 items-center">
          <span className="inline-block">
            <ActiveLink href="/">Home</ActiveLink>
          </span>
          <div
            className="relative"
            onMouseEnter={() => setIsNewsMenuOpen(true)}
            onMouseLeave={() => setIsNewsMenuOpen(false)}
          >
            {/* Wrap News button in an outer div for consistent layout */}
            <span className="inline-block">
              <ActiveLink href="#">News</ActiveLink>
            </span>

            {/* Dropdown Menu */}
            {isNewsMenuOpen && (
              <div className="absolute left-0 bg-gray-300 shadow-md mt-1 rounded-md z-50 w-56 p-4 opacity-90 border border-gray-400">
                <ul className="flex flex-col space-y-2 opacity-100">
                  <li>
                    <Link href="/news/africa" className="button-inactive flex items-center px-4 py-2">
                      <FontAwesomeIcon icon={faGlobeAfrica} className="mr-2" />
                      Africa News
                    </Link>
                  </li>
                  <li>
                    <Link href="/news/blackamerican" className="button-inactive flex items-center px-4 py-2">
                      <FontAwesomeIcon icon={faGlobeAmericas} className="mr-2" />
                      Black America
                    </Link>
                  </li>
                  <li>
                    <Link href="/news/uk" className="button-inactive flex items-center px-4 py-2">
                      <FontAwesomeIcon icon={faGlobeEurope} className="mr-2" />
                      UK News
                    </Link>
                  </li>
                  <li>
                    <Link href="/news/usa" className="button-inactive pointer-events-none cursor-not-allowed flex items-center px-4 py-2">
                      <FontAwesomeIcon icon={faGlobeAmericas} className="mr-2" />
                      USA News
                    </Link>
                    <ul className="mt-1 ml-4 space-y-2">
                      <li>
                        <Link href="/news/usa/health" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faHeartbeat} className="mr-2" />
                          Health
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/business" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                          Business
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/crypto" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faBitcoin} className="mr-2" />
                          Crypto
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/tech" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
                          Tech
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/politics" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faLandmark} className="mr-2" />
                          Politics
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/sports" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faFutbol} className="mr-2" />
                          Sports
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/lifestyle" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faCouch} className="mr-2" />
                          Lifestyle
                        </Link>
                      </li>
                      <li>
                        <Link href="/news/usa/entertainment" className="button-inactive flex items-center px-4 py-2">
                          <FontAwesomeIcon icon={faFilm} className="mr-2" />
                          Entertainment
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <span className="inline-block">
            <ActiveLink href="/events">Events</ActiveLink>
          </span>

          <span className="inline-block">
            <ActiveLink href="/about">About</ActiveLink>
          </span>

          <span className="inline-block">
            <ActiveLink href="/contact">Contact</ActiveLink>
          </span>

          {/* Dashboard Link - Visible only when logged in */}
          {status === "authenticated" && (
            <span className="inline-block">
              <ActiveLink href="/dashboard">Dashboard</ActiveLink>
            </span>
          )}

          {/* User Menu - Separate from the Main Menu */}
          {status === "authenticated" && <UserMenu />}
          {status !== "authenticated" && (
            <>
              <span className="inline-block">
                <ActiveLink href="/login">Login</ActiveLink>
              </span>

              <span className="inline-block">
                <ActiveLink href="/register">Register</ActiveLink>
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
