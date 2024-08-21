import Counter from "./components/Counter";
import Header from "./components/Header";
// import Auth from './components/Auth;'
import Authentication from "./components/Authentication";
import UserProfile from "./components/UserProfile";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Header />
      {/* <Auth /> */}
      {!isLoggedIn && <Authentication />}
      {isLoggedIn && (
        <>
          <UserProfile />
          <Counter />
        </>
      )}
    </>
  );
}

export default App;
