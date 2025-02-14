// app/articles/page.tsx
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <main>
      <h1>Welcome to Articles</h1>
      <p>Select a region to view articles.</p>
      <ul>
        <li><Link href="/articles/usa">USA</Link></li>
        <li><Link href="/articles/africa">Africa</Link></li>
        <li><Link href="/articles/uk">UK</Link></li>
      </ul>
    </main>
  );
}
