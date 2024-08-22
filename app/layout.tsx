import { Inter } from "next/font/google";
import "./globals.css";
import NewsContainer from "./components/NewsContainer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-gray-800`}>
        <NewsContainer>{children}</NewsContainer>
      </body>
    </html>
  );
}
