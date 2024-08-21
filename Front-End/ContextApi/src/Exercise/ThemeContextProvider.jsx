import React from 'react';
 
export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});
 
export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
 
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };
 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
