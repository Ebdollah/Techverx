import React from 'react';
 
import { ThemeContext } from './ThemeContextProvider';
 
export default function Header() {
  const themeCtx = React.useContext(ThemeContext);
 
  return (
    <header>
      <h1>Demo Website</h1>
      <button onClick={themeCtx.toggleTheme}>Toggle Theme</button>
    </header>
  );
}