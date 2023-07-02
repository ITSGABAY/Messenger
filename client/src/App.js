import "./App.css";
import "./Styles/Login.css";
import "./Styles/NavBar.css";
import "./Styles/Registration.css";
import "./Styles/upload.css";
import "./Styles/Post.css";
import "./Styles/Profile.css";
import "./Styles/CreatePost.css";
import "tailwindcss/tailwind.css";

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
import PostMain from "./Pages/PostMain";
import CreatePost from "./Pages/CreatePost";

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
    {
      path: "/post",
      element: <PostMain />,
    },
    {
      path: "/createpost",
      element: <CreatePost />,
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
