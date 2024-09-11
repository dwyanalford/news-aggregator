// app/components/ArticleRemoveButton.tsx

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ArticleRemoveButtonProps {
  link: string; // Article link to identify which article to remove
  onRemove: () => void; // Callback function to update the UI after removal
}

const ArticleRemoveButton: React.FC<ArticleRemoveButtonProps> = ({ link, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleRemove = async () => {
    const confirmed = window.confirm("Are you sure you want to remove this article?");
    if (!confirmed) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/articles/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove the article.");
      }

      // Call the onRemove callback to update the UI
      onRemove();
      
    } catch (error) {
      setError("An error occurred while removing the article.");
      
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRemove}
        disabled={loading}
        className="button-inactive"
        title="Remove Article"
      >
        <FontAwesomeIcon icon={faTrashCan} size="xl" />
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* {snackbar && (
        <Snackbar
          message={snackbar.message}
          onClose={() => setSnackbar(null)}
        />
      )} */}
    </div>
  );
};

export default ArticleRemoveButton;
