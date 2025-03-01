// components/ActiveLink.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const ActiveLink = ({ href, children, className = '' }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'} transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;

