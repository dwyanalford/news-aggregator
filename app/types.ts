// /app/types.ts
export interface Tag {
    id: string;
    name: string;
    count: number;
  }

  export interface Article {
    id: string;
    title: string;
    date: string;
    link: string;
    summary?: string;
    imageURL?: string;
    author: string;
    source: string;
    category: string;
    region?: string;
  }