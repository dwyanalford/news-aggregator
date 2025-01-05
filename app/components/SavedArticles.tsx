// app/components/SavedArticles.tsx

"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Message from './Message';
import { containsProfanity } from '@/app/utils/profanityList'; 

interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL: string;
}

interface SavedArticlesProps {
  filteredArticles: Article[];  // Accept an array of Article objects as a prop
  userTags: Tag[];  // Tags from parent component
  setUserTags: (tags: Tag[]) => void;   // Function to update tags in real time
  fetchUserTags: () => Promise<Tag[]>; 
  handleArticleRemove: (link: string) => void; 
  setTotalArticles: React.Dispatch<React.SetStateAction<number>>; 
}

interface Tag {
  id: string;
  name: string;
  count: number;
}

const SavedArticles = ({ filteredArticles, userTags, setUserTags, fetchUserTags, handleArticleRemove, setTotalArticles }: SavedArticlesProps) => {
  const { data: session } = useSession();  // Ensure user is authenticated
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Record<string, Tag[]>>({}); // Store tags by article ID
  const [newTags, setNewTags] = useState<Record<string, string>>({}); // Store new tags by article ID
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store tag suggestions
  const [activeInput, setActiveInput] = useState<string | null>(null); // Track which input is active
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // State to hold the message text
  const [messageType, setMessageType] = useState<'success' | 'error'>('success'); // Type of message
  const [showMessage, setShowMessage] = useState(false);  // State to control visibility of the message
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});



  useEffect(() => {
    if (session) {
      // Fetch saved articles from the backend
      fetch('/api/articles/getSaved')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch saved articles');
          }
          return response.json();
        })
        .then((data) => {
          setArticles(
            data.sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime())
          );
          console.log('Sorted Articles:', data); // Debugging output
          setLoading(false);

          // Fetch tags for each saved article correctly
          data.forEach((article: Article) => fetchTags(article.id));  // Make sure to fetch tags by article ID
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close all dropdowns if clicked outside
      const clickedElement = event.target as HTMLElement;
      
      // If the clicked element isn't within the input or dropdown, close the suggestions
      if (!clickedElement.closest('.tag-input') && !clickedElement.closest('.tag-dropdown')) {
        setSuggestions([]); // Clear suggestions on outside click
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log('Tags state:', tags);  // Log the tags state to see if it's being populated correctly
  }, [tags]);
  

  // Fetch tags for a specific article ID
  const fetchTags = async (articleId: string) => {
    try {
      const response = await axios.get(`/api/tags?articleId=${articleId}`);
      if (response.status === 200 && Array.isArray(response.data.tags)) {
        // Correctly map tags to the article ID
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: response.data.tags, // Make sure this matches the structure returned from the API
        }));
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };
  

  // Fetch all tag suggestions that the user has created (unique tags)
const fetchAllTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get('/api/tags'); // Ensure this endpoint returns only user's tags
    if (response.status === 200 && response.data?.tags) {
      // Get unique tag names
      const fetchedTags: string[] = response.data.tags.map((tag: { name: string }) => tag.name);
      return [...new Set(fetchedTags)]; // Return unique tags
    }
  } catch (error) {
    console.error('Failed to fetch all tags:', error);
  }
  return [];
};


const handleInputFocus = async (articleId: string) => {
  setActiveInput(articleId);
  const fetchedSuggestions = await fetchAllTags();  // Fetch all tags for suggestions
  const sortedTags = fetchedSuggestions.sort((a: string, b: string) => a.localeCompare(b)); // Sort tags alphabetically
  setSuggestions(sortedTags);  // Set the sorted suggestions
};


  // Handle suggestion click
  const handleSuggestionClick = (articleId: string, suggestion: string) => {
    setNewTags((prevTags) => ({
      ...prevTags,
      [articleId]: suggestion,  // Set the selected suggestion as the input value
    }));
    setActiveInput(null);  // Close the suggestion list
  };

  const handleInputChange = (articleId: string, value: string) => {
    setNewTags((prevTags) => ({
      ...prevTags,
      [articleId]: value,  // Update the input value for the specific article
    }));

    // Filter the suggestions based on the input
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

const handleAddTag = async (articleId: string) => {
  const newTag = newTags[articleId]; // Get the tag input for the specific article
  if (!newTag?.trim()) {
    displayMessage('error', 'Tag name cannot be empty.');  
    return;
  }

  // Check for profanity
  if (containsProfanity(newTag)) {
    displayMessage('error', 'Tag contains inappropriate content.');  
    return;
  }

  // Check for max length
  if (newTag.length > 16) {
    displayMessage('error', `Tag exceeds maximum length of characters allowed.`);  
    return;
  }

  // Check if the tag already exists for this article
  if (tags[articleId]?.some(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
    displayMessage('error', 'tag already exists for this article.'); 
    return;
  }

  try {
    const response = await axios.post('/api/tags/create', { name: newTag, articleId });
    let createdTag = response.data;

    // Add the newly created tag to the `tags` state for the corresponding article
    setTags((prevTags) => ({
      ...prevTags,
      [articleId]: [...(prevTags[articleId] || []), createdTag], // Append the newly created tag
    }));

    // Optionally: Refetch tags to ensure the count is updated correctly in other places
    const updatedTags = await fetchUserTags();  // Fetch updated tags
    setUserTags(updatedTags);  // Update the sidebar tag list

    setNewTags((prevTags) => ({
      ...prevTags,
      [articleId]: '',  // Clear the input field for this article
    }));

    displayMessage('success', 'Tag successfully added.');
  } catch (error) {
    console.error('Failed to add tag:', error);
    displayMessage('error', 'Failed to add tag. Try again.');
  }
};

  const handleRemoveTag = async (articleId: string, tagId: string): Promise<void> => {
    try {
      const deleteResponse = await axios.delete('/api/tags/remove-from-article', {
        data: { articleId, tagId },
      });

      if (deleteResponse.status === 200) {
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: prevTags[articleId].filter(tag => tag.id !== tagId),
        }));

        displayMessage('success', 'Tag successfully deleted.');
        
        // Fetch and update all user tags in the sidebar
      const updatedTags = await fetchUserTags();  // Fetch updated user tags
      setUserTags(updatedTags);  // Update the sidebar with the new tag list
      }
    } catch (error) {
      console.error('Failed to remove tag:', error);
      displayMessage('error', 'Failed to remove tag');
    }
  };

  const handleRemove = async (link: string) => {
    try {
      // Send a DELETE request to the API
      const response = await axios.delete('/api/articles/remove', {
        data: { link }
      });
  
      if (response.status === 200) {
        // Update the article list by removing the deleted article immediately
        handleArticleRemove(link); 
  
        // Fetch updated user tags and update the tag filter menu
        const updatedTags = await fetchUserTags();
        setUserTags(updatedTags);

        // Manually decrease the total article count
        setTotalArticles((prevTotal) => prevTotal - 1); 
  
        // Display success message
        displayMessage('success', 'Article and associated tags removed successfully.');
      } else {
        // Handle failure in removing the article
        displayMessage('error', 'Failed to remove the article.');
      }
    } catch (error) {
      console.error('Error while removing the article:', error);
      displayMessage('error', 'An error occurred while removing the article.');
    }
  };

 // Function to display a message
 const displayMessage = (type: 'success' | 'error', msg: string) => {
  setMessageType(type);  // Set the message type (success or error)
  setMessage(msg);       // Set the message text
  setShowMessage(true);  // Show the message
};

// Function to close the message
const handleCloseMessage = () => setShowMessage(false);

// Toggle function for Tags Button to expand when clicked
const toggleTags = (id: string) => {
  setExpandedTags((prev) => ({
    ...prev,
    [id]: !prev[id], // Toggle the state for the specific article ID
  }));
};


  if (!session) return <p>Please log in to view your saved articles.</p>;
  if (loading) return <p>Loading saved articles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredArticles.length === 0) return <p>You have no saved articles.</p>;

  return (
    <div className="container mx-auto p-8">
      {/* Changed parent container to space out articles in rows */}
      <div className="space-y-4"> 
        {filteredArticles.map((article) => (
          <div key={article.id} className="flex flex-col md:flex-row items-start p-4 border rounded shadow-xl bg-white relative">
            {/* Image Section */}
            <img src={article.imageURL} alt={article.title} className="w-full md:w-64 h-48 object-cover rounded-md mb-4 md:mb-0" />
  
            {/* Details Section */}
            <div className="flex-1 md:ml-6">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
              <p className="mt-2">{article.summary}</p>
  
              {/* Buttons Section */}
              <div className="flex items-center space-x-6 mt-4">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="button-inactive">
                  Read More
                </a>
                <button
                  onClick={() => handleRemove(article.link)}  // Reuse the handleRemove function
                  disabled={loading}
                  className="button-inactive"
                  title="Remove Article"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="xl" />
                </button>
                <button
                  onClick={() => toggleTags(article.id)}
                  className="button-inactive"
                  title={expandedTags[article.id] ? "Close Tags" : "Manage Tags"}
                >
                  {expandedTags[article.id] ? "Close Tags" : "Tags"}
                </button>
              </div>
  
              {/* Tag Management Section */}
              {expandedTags[article.id] && (
              <div className="mt-4">
                <div className="flex flex-wrap mb-2">
                  {Array.isArray(tags[article.id]) && tags[article.id].length > 0 ? (
                    tags[article.id].map((tag) => (
                      <span key={tag.id} className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full flex items-center">
                        {tag.name}
                        <button className="ml-2 text-red-500" onClick={() => handleRemoveTag(article.id, tag.id)}>
                          &times;
                        </button>
                      </span>
                    ))
                  ) : (
                    <p>No tags available for this article</p>
                  )}
                </div>
  
                {/* Tag Input */}
                <div className="relative tag-input">
                  <input
                    type="text"
                    value={newTags[article.id] || ''}
                    onChange={(e) => handleInputChange(article.id, e.target.value)}
                    placeholder="Add new tag"
                    className="border px-2 py-1 mr-2 rounded w-48 font-light"
                    onFocus={() => handleInputFocus(article.id)}
                    list={`suggestions-${article.id}`} 
                  />
                  <button onClick={() => handleAddTag(article.id)} className="button-inactive">
                    Add Tag
                  </button>
                </div>
                {activeInput === article.id && suggestions.length > 0 && (
                  <ul className="absolute bg-gray-200 border border-gray-300 rounded w-48 z-10 tag-dropdown max-h-40 overflow-y-auto">
                      <li className="px-3 py-2 font-semibold text-gray-600 bg-gray-100 italic text-sm">Your Existing Tags</li> {/* Heading */}
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(article.id, suggestion)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-none"
                          >
                            {suggestion}
                          </li>
                        ))}
                  </ul>
                )}
              </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Message 
        type={messageType} 
        message={message} 
        show={showMessage} 
        onClose={handleCloseMessage} 
      />
    </div>
  );  
};

export default SavedArticles;
