# The-Dwyan-Project

## Project Overview

The-Dwyan-Project is a [Next.js](https://nextjs.org/) application built with **TypeScript**, **MongoDB**, and **Prisma**. It allows users to:

- Save and organize articles.
- Filter articles by **tags**.
- Add and manage **tags** for articles.
- View articles in a **responsive layout** optimized for different screen sizes.

The app leverages **Zustand** for state management, **Tailwind CSS** for styling, and **NextAuth** for authentication.

---

## Key Features

- **Save Articles:** Users can save articles for later reading.
- **Tag Management:** Create, add, and remove tags for articles.
- **Responsive Design:** Layout adapts based on screen size.
- **Image Extraction:** Automatically fetches article images.
- **Profanity Filtering:** Ensures tag input is clean and appropriate.
- **User Authentication:** Secure login and registration with **NextAuth**.
- **State Management:** Uses **Zustand** for managing saved articles.

---

## Folder Structure

```plaintext
next-frontend/
├── app/
│   ├── about/                 # About page
│   ├── api/                   # API routes
│   │   ├── articles/          # Handles saving, filtering, and removing articles
│   │   ├── auth/              # User authentication (NextAuth)
│   │   ├── tags/              # Tag management API (add, remove, filter)
│   │   ├── users/             # User-related APIs
│   ├── components/            # Reusable UI components
│   │   ├── SidebarLayout.tsx  # Sidebar layout for filtering
│   │   ├── SavedArticles.tsx  # Displays saved articles and manages tags
│   │   ├── TagFilterMenu.tsx  # Sidebar filter for tags
│   │   ├── Message.tsx        # Displays notifications or messages
│   ├── dashboard/             # Dashboard showing saved articles
│   ├── data/                  # Static data (e.g., Black American data)
│   ├── hooks/                 # Custom React hooks
│   ├── news/                  # News categories (Africa, USA, etc.)
│   ├── store/                 # Zustand state management for saved articles
│   ├── utils/                 # Utility functions (e.g., fetch articles, sort names)
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
├── lib/                       # Prisma database configuration
│   ├── prisma.ts
├── prisma/                    # Database schema
│   ├── schema.prisma
├── public/                    # Images and placeholders for articles
│   ├── images/
├── .env                       # Environment variables
├── LICENSE                    # License file
├── README.md                  # Project documentation
├── next.config.js             # Next.js configuration
├── package.json               # NPM dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration




