// app/components/NewsContainer.tsx

import React from 'react';

interface NewsContainerProps {
  children: React.ReactNode;
}

const NewsContainer: React.FC<NewsContainerProps> = ({ children }) => {
  return <div className='bg-gray-800'>{children}</div>;
};

export default NewsContainer;
