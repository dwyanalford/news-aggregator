// app/page.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="prose mx-auto p-8 mt-36">
      <h1>News Aggregator App</h1>
      <p>
      A dynamic Next.js application that aggregates news articles from multiple sources using RSS feeds. Features include real-time article fetching, state management with Zustand, Tailwind CSS for responsive design, fallback handling for images, and user-defined filtering. Designed to provide a seamless news browsing experience.
      </p>
      <section>
        <h2>Features:</h2>
        <ul>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            Save and organize articles.
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            Filter articles by tags.
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            Add and manage tags for articles.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
