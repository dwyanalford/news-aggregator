"use client";

import ActiveLink from './ActiveLink'; // Reuse ActiveLink for consistency

const RegionMenu = () => {
  return (
    <div className="flex justify-center space-x-4 border-b pb-4 mt-[90px]">
      <ActiveLink href="/news/blackamerican">Black American News</ActiveLink>
      <ActiveLink href="/news/usa">USA News</ActiveLink>
      <ActiveLink href="/news/africa">Africa News</ActiveLink>
      <ActiveLink href="/news/uk">UK News</ActiveLink>
    </div>
  );
};

export default RegionMenu;
