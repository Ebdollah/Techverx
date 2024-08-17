import { Provider } from "react-redux";
import store from "./redux/store";
import ShowUser from "./components/ShowUser";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import CreateUser from "./components/CreateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ShowUser />,
      },
      {
        path : "/create",
        element : <CreateUser />
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
}
