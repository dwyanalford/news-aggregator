// app/components/SavedArticles.tsx

"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ArticleRemoveButton from './ArticleRemoveButton';
import axios from 'axios';
import Message from './Message';

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
  userTags: string[];  // Tags from parent component
  setUserTags: (tags: string[]) => void;  // Function to update tags in real time
  fetchUserTags: (articleId?: string) => Promise<any>; 
}

interface Tag {
  id: string;
  name: string;
}

const SavedArticles = ({ filteredArticles, userTags, setUserTags, fetchUserTags }: SavedArticlesProps) => {
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
          setArticles(data);
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
  

  // Fetch tags for a specific article ID
  const fetchTags = async (articleId: string) => {
    try {
      const response = await axios.get(`/api/tags?articleId=${articleId}`);
      if (response.status === 200) {
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: response.data,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  // Fetch all tag suggestions
  const fetchAllTags = async () => {
    try {
      const response = await axios.get('/api/tags');
      if (response.status === 200) {
        return response.data.map((tag: Tag) => tag.name);
      }
    } catch (error) {
      console.error('Failed to fetch all tags:', error);
    }
    return [];
  };

  // Handle input focus to show suggestions
  const handleInputFocus = async (articleId: string) => {
    setActiveInput(articleId);
    const fetchedSuggestions = await fetchAllTags();  // Fetch all tags for suggestions
    const sortedTags = fetchedSuggestions.sort((a: string, b: any) => a.localeCompare(b)); // Sort tags alphabetically
    setSuggestions(sortedTags);
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

    // Check if the tag already exists for this article
    if (tags[articleId]?.some(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
      displayMessage('error', 'tag already exists for this article.'); 
      return;
    }

    try {
        const response = await axios.post('/api/tags/create', { name: newTag, articleId });
        let tag = response.data;

        // Add the new tag to the article's tag list in the UI immediately
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: [...(prevTags[articleId] || []), tag], // Append the new tag
        }));

        // Check if the tag already exists in the sidebar before adding it
        if (!userTags.includes(tag.name)) {
          const updatedTags: string[] = [...userTags, tag.name];
          setUserTags(updatedTags.sort());  // Alphabetically sort tags and update sidebar

          // Only fetch the updated user tags if a new tag was added to the sidebar
          await fetchUserTags();  // Fetch and update all user tags in the sidebar
        }

        setNewTags((prevTags) => ({
            ...prevTags,
            [articleId]: '',  // Clear input for this article only
        }));

        // Display success message
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

  const handleRemove = (link: string) => {
    setArticles((prevArticles) => prevArticles.filter(article => article.link !== link));
  };

  if (!session) return <p>Please log in to view your saved articles.</p>;
  if (loading) return <p>Loading saved articles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredArticles.length === 0) return <p>You have no saved articles.</p>;

  // Function to display a message
  const displayMessage = (type: 'success' | 'error', msg: string) => {
    setMessageType(type);  // Set the message type (success or error)
    setMessage(msg);       // Set the message text
    setShowMessage(true);  // Show the message
  };

// Function to close the message
const handleCloseMessage = () => setShowMessage(false);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <div key={article.id} className="p-4 border rounded shadow-xl bg-white relative">
            <img src={article.imageURL} alt={article.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
            <p className="mt-2">{article.summary}</p>
            <div className="flex items-center space-x-6 mt-4">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="button-inactive">
                Read More
              </a>
              <ArticleRemoveButton link={article.link} onRemove={() => handleRemove(article.link)} />
            </div>

             {/* Tag Management Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap mb-2">
                {tags[article.id]?.map((tag) => (
                  <span key={tag.id} className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full flex items-center">
                    {tag.name}
                    <button className="ml-2 text-red-500" onClick={() => handleRemoveTag(article.id, tag.id)}>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
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
