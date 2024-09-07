// components/UserMenu.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Avatar from "react-avatar";
import { useState, useEffect, useRef } from "react";

const UserMenu = () => {
  const { data: session } = useSession(); // Get session data
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Function to handle mouse enter (show dropdown)
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  // Function to handle mouse leave (hide dropdown)
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const userMenuRef = useRef<HTMLDivElement | null>(null);  // Type the ref correctly

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);  // Close dropdown if clicking outside
      }
    }
  
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
  
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);  // Ensure this line is inside the useEffect function's return
    };
  }, [userMenuRef]);
  

  return (
    <div 
        ref={userMenuRef} 
        className="fixed top-4 right-4 lg:right-8 flex items-center space-x-2 z-50" 
        onMouseEnter={() => setIsDropdownOpen(true)}

    >
      {/* User Avatar */}
      <Avatar 
        size="40" 
        round={true} 
        src="https://www.gravatar.com/avatar?d=mp"  // Generic avatar image URL
        alt={`Avatar of ${session?.user?.name || 'User'}`} 
      />

      {/* User's Name */}
      <span className="text-sm text-gray-700">{session?.user?.name || 'User'}</span>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-12 right-0 w-28 bg-white border rounded shadow-lg z-50">
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-left text-red-500 hover:text-red-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
