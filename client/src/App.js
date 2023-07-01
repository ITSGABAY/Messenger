import "./App.css";
import "./Styles/Login.css";
import "./Styles/NavBar.css";
import "./Styles/Registration.css";
import "./Styles/upload.css";
//ASDASDASDASDASDADA
import "./Styles/Profile.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import NavBar from "./Pages/NavBar";
import Registration from "./Pages/Registration";
import Upload from "./Pages/upload";
import Profile from "./Pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/upload",
      element: <Upload />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return (
    <div>
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
