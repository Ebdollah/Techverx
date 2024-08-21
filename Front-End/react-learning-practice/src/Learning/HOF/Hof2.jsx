import React from 'react';

// Higher-Order Function to conditionally render a component
function withConditionalRendering(Component) {
  return function WrappedComponent(props) {
    if (!props.isVisible) {
      return <div>Component is hidden</div>;
    }
    return <Component {...props} />;
  };
}

// Sample Component
function Profile({ name }) {
  return <h2>Welcome, {name}!</h2>;
}

// Enhanced Component with Conditional Rendering
const ProfileWithConditionalRendering = withConditionalRendering(Profile);

// Usage in App
export default function Hof2() {
  return (
    <div>
      <ProfileWithConditionalRendering isVisible={true} name="John Doe" />
      <ProfileWithConditionalRendering isVisible={false} name="Jane Doe" />
    </div>
  );
}
