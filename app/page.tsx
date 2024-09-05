// app/page.tsx

const HomePage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to MyApp</h1>
      <p className="text-center text-lg text-gray-700 mb-8">
        Discover the latest news and articles, save and tag your favorite reads, and more.
      </p>
      {/* Sections for features, about, etc. */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc ml-8 text-gray-600">
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

