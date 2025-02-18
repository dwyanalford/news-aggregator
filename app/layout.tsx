// app/layout.tsx
"use client";

import { Rubik } from "next/font/google";
import "./globals.css";
import AppContainer from "@/app/components/AppContainer";
import HeaderLayout from "@/app/components/HeaderLayout";
import { SessionProvider } from "next-auth/react";

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300','400', '500', '600', "700"], // Adjust weights as necessary
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dwyan Alford" />
        <link rel="icon" href="./favicon.png" />
      </head>
      <body className={`${rubik.className} bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-200`}>
        <SessionProvider>
          <HeaderLayout />
          <AppContainer>{children}</AppContainer>
        </SessionProvider>
      </body>
    </html>
  );
}
