// app/components/AppContainer.tsx
import React from 'react';
import Sidebar from './Sidebar';
import UserMenu from './UserMenu';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex">
      <Sidebar />
      <UserMenu />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppContainer;
