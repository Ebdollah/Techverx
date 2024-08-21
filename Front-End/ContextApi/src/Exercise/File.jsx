import Page from './Page';
import ThemeContextProvider from './ThemeContextProvider';
 
function File() {
  return (
    <ThemeContextProvider>
      <Page />
    </ThemeContextProvider>
  )
}
 
export default File;