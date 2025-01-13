// app/page.tsx

const HomePage = () => {
  return (
    <div className="prose mx-auto p-8 mt-44">
      <h1>News Aggregator App</h1>
      <p>
        Discover the latest news and articles, save and tag your favorite reads, and more.
      </p>
      {/* Sections for features, about, etc. */}
      <section>
        <h2>Features</h2>
        <ul>
          <li>Save and Tag Articles</li>
          <li>Explore Regional News</li>
          <li>User Dashboard to manage your articles</li>
          {/* Add more features as needed */}
        </ul>
      </section>
      {/* More sections can be added as needed */}
    </div>
  );
};

export default HomePage;
