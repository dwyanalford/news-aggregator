// app/utils/fetchUserTagsUtils.ts

/*
  This utility function `fetchUserTags` fetches tags and their associated article counts using an API call.
  It uses `axios` to send a GET request to `/api/tags` and returns a JSON response with tag `id`, `name`, and `count`.
  In case of failure, it returns a `500` status with an error message.
*/

import axios from 'axios';
import { Tag } from '@/app/types'; 

export async function fetchUserTags(): Promise<Tag[]> {
  try {
    const response = await axios.get('/api/tags');
    const data = response.data;

    // Add this to inspect the actual response structure
    console.log('API Response:', data);

    // Check if the response contains the "tags" field and is an array
    if (!data || !Array.isArray(data.tags)) {
      throw new Error('Tags not found in the response');
    }

    // Return the tags array with the expected fields (id, name, count)
    return data.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      count: tag.count || 0, // Use the count from the response or default to 0
    }));
  } catch (error) {
    console.error('Error fetching user tags:', error);
    throw new Error('Failed to fetch user tags');
  }
}
