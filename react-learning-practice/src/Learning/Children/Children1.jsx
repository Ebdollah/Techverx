import React from 'react';

function Panel({ title, children }) {
  return (
    <div className="panel">
      <h2>{title}</h2>
      <div className="panel-content">{children}</div>
    </div>
  );
}

export default function Children1() {
  return (
    <div>
      <Panel title="User Information">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </Panel>
      <Panel title="Recent Activity">
        <ul>
          <li>Logged in</li>
          <li>Updated profile</li>
          <li>Made a purchase</li>
        </ul>
      </Panel>
    </div>
  );
}
