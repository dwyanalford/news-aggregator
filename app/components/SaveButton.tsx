// app/components/SaveButton.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';

interface SaveButtonProps {
  article: {
    title: string;
    date: string;
    link: string;
    summary: string;
    imageURL?: string;
  };
  isSaved: boolean;  // New prop to indicate if the article is saved
  onArticleSaved: (link: string) => void;  // Callback function to notify parent component
}

const SaveButton: React.FC<SaveButtonProps> = ({ article, isSaved, onArticleSaved }) => {
  const { data: session } = useSession();

  const handleSaveArticle = async () => {
    if (!session) return; // Only allow saving if the user is authenticated

    try {
      const response = await axios.post("/api/articles/save", article);
      if (response.status === 200) {
        onArticleSaved(article.link);  // Use parent callback to notify saved state
      }
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  if (!session) return null;

  return (
    <button
      title={isSaved ? "Saved" : "Save"}
      className={`${
        isSaved 
          ? 'border-2 border-green-500 text-green-500 hover:text-green-700' 
          : 'button-inactive'
      } px-4 py-2 rounded-md flex items-center`}
      onClick={handleSaveArticle}
      disabled={isSaved}  // Disable button if the article is already saved
    >
      <FontAwesomeIcon icon={isSaved ? faCheck : faBookmark} className="news-icon mr-2" />
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
};


export default SaveButton;
