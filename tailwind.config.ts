import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // All files in /app folder
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Components folder inside /app
    "./app/(routes)/**/*.{js,ts,jsx,tsx,mdx}", // Any routes or special directories inside /app
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // Main headline size
              fontWeight: '700',   // Bold
              lineHeight: '1.3',   // Slightly tight
            },
            h2: {
              fontSize: '1.875rem', // Subheadline size
              fontWeight: '600',    // Semi-bold
              lineHeight: '1.4',
            },
            h3: {
              fontSize: '1.5rem',   // Smaller headline size
              fontWeight: '600',
              lineHeight: '1.5',
            },
            p: {
              fontSize: '1.125rem', // Larger paragraph size
              fontWeight: '400',    // Normal weight
              lineHeight: '1.8',    // Comfortable reading
            },
            a: {
              fontSize: '1.125rem', // Matches paragraph size
              fontWeight: '500',    // Medium weight
              lineHeight: '1.8',
              textDecoration: 'none', // Ensure no underline by default
            },
            ul: {
              listStyleType: 'none', // Removes bullets from <ul> by default
              paddingLeft: '0',     // Removes left padding
            },
            li: {
              fontSize: '1.125rem', // Matches paragraph size
              fontWeight: '400',
              lineHeight: '1.8',
            },
            blockquote: {
              fontSize: '1.125rem', // Matches paragraph size
              fontWeight: '400',
              fontStyle: 'italic', // Retain emphasis
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Enables the Tailwind Typography plugin
  ],
};

export default config;
