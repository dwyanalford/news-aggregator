import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // All files in /app folder
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Components folder inside /app
    "./app/(routes)/**/*.{js,ts,jsx,tsx,mdx}", // Any routes or special directories inside /app
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
        },
      });
    },
  ],
};

export default config;