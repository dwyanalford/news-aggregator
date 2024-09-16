// app/components/SaveButton.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

interface SaveButtonProps {
  article: {
    title: string;
    date: string;
    link: string;
    summary: string;
    imageURL?: string;
  };
}

const SaveButton: React.FC<SaveButtonProps> = ({ article }) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveArticle = async () => {
    if (!session) return; // Only allow saving if the user is authenticated

    try {
      // Pass both cleaned summary and raw description to the save API
      const response = await axios.post("/api/articles/save", article);
      if (response.status === 200) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  // Render nothing if the user is not authenticated
  if (!session) return null;

  return (
    <button
      title="Save"
      className="text-yellow-500 hover:text-yellow-700"
      onClick={handleSaveArticle}
      disabled={isSaved}  // Disable button if the article is already saved
    >
      <FontAwesomeIcon icon={faBookmark} className="news-icon" />Save
      {isSaved && <span className="text-xs ml-2">Saved</span>}
    </button>
  );
};

export default SaveButton;
