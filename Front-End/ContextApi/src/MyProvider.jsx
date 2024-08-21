import React, { useState } from 'react';
import MyContext from './MyContext';

// Create a provider component
const MyProvider = ({ children }) => {
  const [state, setState] = useState('default value');

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
