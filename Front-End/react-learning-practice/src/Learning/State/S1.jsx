import React, { useState } from 'react';

function S1() {
  const [count, setCount] = useState(0);

  const increment = () => {
    console.log('Before setCount:', count); // Logs the current count
    // setCount(c => c + 1); // Requests a re-render with count + 1
    setCount(count + 1); // Requests a re-render with count + 1
    setCount(count + 1); // Requests a re-render with count + 1
    console.log('After setCount:', count); // Still logs the old count
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className="m-2 p-1 bg-blue-400 rounded-lg w-20" onClick={increment}>Increment</button>
    </div>
  );
}

export default S1;
