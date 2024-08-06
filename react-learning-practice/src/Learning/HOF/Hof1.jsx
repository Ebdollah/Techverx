import React from 'react';

// Higher-Order Function to log props
function withLogging(Component) {
  return function WrappedComponent(props) {
    console.log('Current props:', props);
    return <Component {...props} />;
  };
}

// Sample Component
function HelloWorld({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Enhanced Component with Logging
const HelloWorldWithLogging = withLogging(HelloWorld);

// Usage in App
export default function Hof1() {
  return <HelloWorldWithLogging name="React Developer" />;
}
