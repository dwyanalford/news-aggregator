// app/components/SavedArticles.tsx

"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ArticleRemoveButton from './ArticleRemoveButton';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  date: string;
  link: string;
  summary: string;
  imageURL: string;
}

interface Tag {
  id: string;
  name: string;
}

const SavedArticles = () => {
  const { data: session } = useSession();  // Ensure user is authenticated
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Record<string, Tag[]>>({}); // Store tags by article ID
  const [newTags, setNewTags] = useState<Record<string, string>>({}); // Store new tags by article ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const fetchTags = async (articleId: string) => {
  try {
    const response = await axios.get(`/api/tags?articleId=${articleId}`);
    if (response.status === 200) {
      setTags(prevTags => ({
        ...prevTags,
        [articleId]: response.data,  // Ensure tags are only set for the specific article
      }));
    }
  } catch (error) {
    console.error('Failed to fetch tags:', error);
  }
};

  const handleInputChange = (articleId: string, value: string) => {
    setNewTags((prevTags) => ({
      ...prevTags,
      [articleId]: value,  // Update the input value for the specific article
    }));
  };

  const handleAddTag = async (articleId: string) => {
    const newTag = newTags[articleId]; // Get the tag input for the specific article
    if (!newTag?.trim()) return;
  
    try {
      console.log('Creating or finding tag with name:', newTag); // Log the tag name being processed
  
      // Step 1: Create or get an existing tag using the /api/tags/create route with POST method
      const response = await axios.post('/api/tags/create', { name: newTag }, { headers: { 'Content-Type': 'application/json' } });
  
      let tag;
      if (response.status === 201) {
        tag = response.data; // New tag created
        console.log('New tag created:', tag); // Log the created tag details
      } else if (response.status === 200) {
        tag = response.data; // Existing tag found
        console.log('Existing tag found:', tag); // Log the existing tag details
      } else {
        console.error('Unexpected response status:', response.status); // Log unexpected status codes
        return;
      }
  
      // Step 2: Associate the tag with the article
      console.log('Associating tag with article:', { articleId, tagId: tag.id });  // Log data being sent for association
      const addResponse = await axios.post('/api/tags/add-to-article', { articleId, tagId: tag.id });
  
      if (addResponse.status === 201) {
        console.log(`Tag ${tag.name} associated with article ${articleId}`); // Log successful association
  
        // Successfully added, update the state
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: [...(prevTags[articleId] || []), tag],  // Update only the specific article's tags
        }));
  
        setNewTags((prevTags) => ({
          ...prevTags,
          [articleId]: '',  // Clear input for this article only
        }));
      } else {
        console.error('Failed to associate tag with the article:', addResponse.data.error); // Log error from backend
      }
    } catch (error) {
      console.error('Failed to add tag:', error); // Log any other errors during the process
    }
  };  
  
  const handleRemoveTag = async (articleId: string, tagId: string): Promise<void> => {
    try {
      // Directly delete the tag using the articleId (SavedArticle ID) and tagId
      const deleteResponse = await axios.delete('/api/tags/remove-from-article', {
        data: { articleId, tagId },
      });
  
      if (deleteResponse.status === 200) {
        // Successfully deleted, now remove the tag from the UI state
        setTags((prevTags) => ({
          ...prevTags,
          [articleId]: prevTags[articleId].filter(tag => tag.id !== tagId),  // Update the UI state
        }));
        console.log(`Tag ${tagId} removed from article ${articleId}`);
      } else {
        console.error(`Failed to delete tag: ${deleteResponse.data.error}`);
      }
    } catch (error) {
      console.error('Failed to remove tag:', error);
    }
  };
  

  const handleRemove = (link: string) => {
    setArticles((prevArticles) => prevArticles.filter(article => article.link !== link));
  };

  if (!session) return <p>Please log in to view your saved articles.</p>;
  if (loading) return <p>Loading saved articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      {articles.length === 0 ? (
        <p>You have no saved articles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="p-4 border rounded shadow-xl bg-white">
              <img src={article.imageURL} alt={article.title} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
              <p className="mt-2">{article.summary}</p>
              <div className="flex items-center space-x-6 mt-4"> 
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-inactive"
                >
                  Read More
                </a>
                {/* Add RemoveButton for each article */}
                <ArticleRemoveButton link={article.link} onRemove={() => handleRemove(article.link)} />
              </div>
              
              {/* Tag Management Section */}
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Tags</h3>
                <div className="flex flex-wrap mb-2">
                  {tags[article.id]?.map((tag) => (
                    <span key={tag.id} className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full flex items-center">
                      {tag.name}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveTag(article.id, tag.id)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newTags[article.id] || ''}  // Use individual input state for each article
                    onChange={(e) => handleInputChange(article.id, e.target.value)}  // Handle input change for each article
                    placeholder="Add new tag"
                    className="border px-2 py-1 mr-2 rounded"
                  />
                  <button
                    onClick={() => handleAddTag(article.id)}
                    className="button-inactive"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
