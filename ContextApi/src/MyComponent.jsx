import React, { useContext } from 'react';
import MyContext from './MyContext';

function MyComponent() {
  const { state, setState } = useContext(MyContext);

  return (
    <div>
      <p>Current state: {state}</p>
      <button onClick={() => setState('new value')}>Change State</button>
    </div>
  );
}

export default MyComponent;
