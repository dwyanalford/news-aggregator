// components/UserMenu.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import HoverTooltip from "./HoverToolTip";
import { User, ChevronDown, ChevronUp, Home, Calendar, Settings, LogOut } from "lucide-react";

const UserMenu = () => {
  const { data: session } = useSession(); // Get session data
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if clicking outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div 
      ref={userMenuRef} 
      className="fixed top-4 right-4 lg:right-8 flex items-center space-x-2 z-50 bg-white dark:bg-black p-2 rounded shadow"
      onMouseEnter={() => setIsDropdownOpen(true)}
    >
      {!session ? (
        <>
          <HoverTooltip label="Login">
            <Link href="/login">
              <button className="btn">Login</button>
            </Link>
          </HoverTooltip>
          <HoverTooltip label="Sign Up">
            <Link href="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </HoverTooltip>
        </>
      ) : (
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-1 btn">
            <HoverTooltip label="Account">
              <User size={40} className="text-gray-700 dark:text-gray-300" />
            </HoverTooltip>
            <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
              {session?.user?.name || 'User'}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50">
              <ul>
                <li>
                  <Link href="/dashboard">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2">
                      <HoverTooltip label="Dashboard">
                        <Home size={16} />
                      </HoverTooltip>
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2">
                      <HoverTooltip label="Events">
                        <Calendar size={16} />
                      </HoverTooltip>
                      Events
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2">
                      <HoverTooltip label="Profile">
                        <Settings size={16} />
                      </HoverTooltip>
                      Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 text-red-500"
                  >
                    <HoverTooltip label="Logout">
                      <LogOut size={16} />
                    </HoverTooltip>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
