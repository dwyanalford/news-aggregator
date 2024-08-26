import { Rubik } from "next/font/google";
import "./globals.css";
import NewsContainer from "./components/NewsContainer";

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
      <body className={rubik.className}>
        <NewsContainer>{children}</NewsContainer>
      </body>
    </html>
  );
}
