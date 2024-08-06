import React, { useState, useEffect } from 'react';

// Higher-Order Function to fetch data
function withDataFetching(url) {
  return function WrappedComponent(Component) {
    return function DataFetchingComponent(props) {
      const [data, setData] = useState(null);

      useEffect(() => {
        async function fetchData() {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        }
        fetchData();
      }, [url]);

      if (!data) {
        return <div>Loading...</div>;
      }

      return <Component {...props} data={data} />;
    };
  };
}

// Sample Component
function UserList({ data }) {
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Enhanced Component with Data Fetching
const UserListWithData = withDataFetching('https://jsonplaceholder.typicode.com/users')(UserList);

// Usage in App
export default function Hof3() {
  return <UserListWithData />;
}
