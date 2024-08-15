import Counter from './components/Counter';
import Header from './components/Header';
// import Auth from './components/Auth;'
import Authentication from './components/Authentication';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
    <Header />
    {/* <Auth /> */}
    <Authentication />
    {/* <UserProfile/> */}
    <Counter />
    </>
  );
}

export default App;
