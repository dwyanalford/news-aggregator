// components/ActiveLink.tsx
"use client"; // Update this component to be a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct import for Next.js App Router
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname(); // Get the current path using usePathname
  const isActive = pathname === href; // Determine if the link is active

  return (
    <Link
    href={href}
    className={`${isActive ? 'button-active' : 'button-inactive'} w-32 lg:w-auto text-center mx-auto lg:mx-0`}
    >
    {children}
    </Link>

  );
};

export default ActiveLink;