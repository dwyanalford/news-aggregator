// app/components/HeaderLayout.tsx

"use client";

import { useSession } from "next-auth/react";
import HeaderBranding from "@/app/components/HeaderBranding";
import HeaderMenu from "@/app/components/HeaderMenu";
import HeaderUserActions from "@/app/components/HeaderUserActions";

const HeaderLayout = () => {
  const { status } = useSession();

  return (
    <header className="bg-gray-200 dark:bg-gray-900 shadow-lg flex flex-row w-full h-[85px] p-2 gap-2 overflow-hidden fixed z-50 top-0">
      
        {/* Left: Branding */}
        <HeaderBranding />

        {/* Center: Main Navigation */}
        <HeaderMenu />

        {/* Right: User Profile, Dark Mode Toggle, and Authentication */}
        <HeaderUserActions status={status} />
  
    </header>
  );
};

export default HeaderLayout;
