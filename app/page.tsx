// app/pages.tsx
import React from 'react';

const HomePage = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Full-screen background image */}
      <img
        src="/images/default.webp"  // Replace with your background image path
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl text-white font-bold">Welcome to Our News Site</h1>
      </div>
    </div>
  );
};

export default HomePage;
