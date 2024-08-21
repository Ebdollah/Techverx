import Form from './Form';
import React from 'react';

// Don't change the name of the 'App' 
// function and keep it a named export

export default function Appp() {
    const cls = React.useRef();
  function handleRestart() {
    cls.current.clear();
  }

  return (
    <div id="app">
      <button onClick={handleRestart}>Restart</button>
      <Form ref={cls}  />
    </div>
  );
}

