// app/utils/fetchUserTagsUtils.ts

import axios from 'axios';

/**
 * Fetch user-created tags from the API.
 * @returns {Promise<string[]>} A promise that resolves to an array of tag names.
 */
export const fetchUserTags = async (articleId?: string) => {  // Accept an optional articleId
  try {
    const endpoint = articleId ? `/api/tags?articleId=${articleId}` : '/api/tags';  // Use different endpoint for "all"
    const response = await axios.get(endpoint);  // Fetch tags from the appropriate endpoint
    if (response.status === 200) {
      const tagsData = response.data.map((tag: any) => tag.name);  // Extract tag names from response data
      console.log('Fetched user tags:', tagsData);  // Debugging: Log fetched tags
      return tagsData;  // Return fetched tags
    } else {
      console.error('Failed to fetch user tags:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user tags:', error);
  }
  return [];  // Return an empty array if fetching fails
};
