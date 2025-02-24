export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm md:text-base text-gray-400">
            Dedicated to amplifying diverse voices and stories that matter to the
            African-American community.
          </p>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">Contact</h3>
          <p className="text-sm md:text-base text-gray-400">
            Email: contact@newsaggregator.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}