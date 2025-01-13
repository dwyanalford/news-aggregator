import type { Config } from "tailwindcss";

const config: Config = {
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
              fontSize: '2.25rem', // Main headlines
              fontWeight: '700',
              lineHeight: '1.3',
            },
            h2: {
              fontSize: '1.875rem', // Secondary headlines
              fontWeight: '600',
              lineHeight: '1.4',
            },
            h3: {
              fontSize: '1.5rem', // Smaller headlines
              fontWeight: '600',
              lineHeight: '1.5',
            },
            p: {
              fontSize: '1rem', // Base font size for paragraphs
              fontWeight: '400',
              lineHeight: '1.75',
            },
            a: {
              color: '#1d4ed8', // Tailwind's blue-700
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            li: {
              fontSize: '1rem', // List items match paragraph size
              lineHeight: '1.75',
            },
            blockquote: {
              fontSize: '1.25rem', // Emphasized quotes
              fontWeight: '500',
              fontStyle: 'italic',
              borderLeftWidth: '0.25rem',
              paddingLeft: '1rem',
              color: '#6b7280', // Gray-500
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
