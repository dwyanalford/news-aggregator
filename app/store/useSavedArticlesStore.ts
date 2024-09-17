// app/store/useSavedArticlesStore.ts
import { create } from 'zustand';
import axios from 'axios';

// Define the shape of our state
interface SavedArticlesState {
  savedArticles: string[]; // Array of article links that are saved
  fetchSavedArticles: () => Promise<void>; // Function to fetch saved articles from the server
  addSavedArticle: (link: string) => void; // Function to add an article to the saved list
}

export const useSavedArticlesStore = create<SavedArticlesState>((set) => ({
  savedArticles: [],

  // Fetch saved articles from the server and update the state
  fetchSavedArticles: async () => {
    try {
      const response = await axios.get('/api/articles/getSaved');
      const savedArticlesLinks = response.data.map((article: { link: string }) => article.link);
      set({ savedArticles: savedArticlesLinks });
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    }
  },

  // Add a saved article to the state
  addSavedArticle: (link: string) => set((state) => {
    if (!state.savedArticles.includes(link)) {
      return { savedArticles: [...state.savedArticles, link] };
    }
    return state;
  }),
}));
