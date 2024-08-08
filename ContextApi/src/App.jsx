import React from 'react';
import { MyProvider } from './MyProvider';
import MyComponent from './MyComponent';

function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}

export default App;
