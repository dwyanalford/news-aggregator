import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // All files in /app folder
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Components folder inside /app
    "./app/(routes)/**/*.{js,ts,jsx,tsx,mdx}", // Any routes or special directories inside /app
  ],
  theme: {
    extend: {
      fontSize: {
        base: '1rem',   // Base font size for body text
        lg: '1.125rem', // Slightly larger for emphasis in paragraphs
        xl: '1.25rem',  // Subtitle or smaller headlines
        '2xl': '1.5rem', // Secondary headlines or important excerpts
        '3xl': '2rem',   // Main headlines
        '4xl': '2.25rem', // Very large headlines, if needed
        '5xl': '3rem',   // Hero or special headlines
      },
    },
  },
  plugins: [],
};

export default config;
