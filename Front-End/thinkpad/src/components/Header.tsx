"use client";

import React, { useState } from "react";

function Header() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { index: 0, title: "Noter" },
    { index: 1, title: "Recall" },
  ];

  return (
    <header className="w-full p-4 bg-gray-100 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">App Header</h1>
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.index}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                tabIndex === tab.index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setTabIndex(tab.index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-6">
        {tabIndex === 0 && (
          <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2">Noter Tab Content</h2>
            <p>This is where your noter content will go.</p>
          </div>
        )}
        {tabIndex === 1 && (
          <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2">Recall Tab Content</h2>
            <p>This is where your recall content will go.</p>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}

export default Header;
