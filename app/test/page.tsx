import React from 'react';

export default function Testpage() {
  return (
    <div className="flex flex-wrap justify-center bg-orange-500">
        <div className="flex flex-col h-full w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden">
            <img src="image-url" alt="Article Image" className="w-full h-48 object-cover" />
            <div className="flex-grow p-4">
                <h2 className="text-xl font-semibold mb-2">Article Title</h2>
                <p className="text-gray-700 mb-4">Short description or content of the article...</p>
                <p className="text-gray-600">Additional text or summary...</p>
            </div>
            </div>
        </div>
    </div>

  );
}