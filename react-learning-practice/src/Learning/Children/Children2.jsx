import React, { useState } from 'react';

function TabContainer({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg">
      <div className="flex border-b">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-2 text-center ${
              activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
}

function Tab({ title, children }) {
  return <div>{children}</div>;
}

export default function Children2() {
  return (
    <TabContainer>
      <Tab title="Home">
        <p>Welcome to the homepage!</p>
      </Tab>
      <Tab title="Profile">
        <p>Here is your profile information.</p>
      </Tab>
      <Tab title="Settings">
        <p>Adjust your settings here.</p>
      </Tab>
    </TabContainer>
  );
}
