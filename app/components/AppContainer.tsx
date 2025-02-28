// app/components/AppContainer.tsx
import React from 'react';
import Sidebar from './Sidebar';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AppContainer;
