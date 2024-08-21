import React from 'react'

function Container({ children }) {
    return <div className="container">{children}</div>;
  }

export default function Children() {
  return (
    <div>
        <Container>
            <p>Hello world</p>
        </Container>
    </div>
  ) 
}
