import "./App.css";
import "./Styles/Login.css";
import "./Styles/NavBar.css";
import "./Styles/Registration.css";
import "./Styles/upload.css";
import "./Styles/Post.css";
import "./Styles/Profile.css";
import "./Styles/CreatePost.css";
import "./Styles/Comment.css";
import "./Styles/SearchBar.css";
import "./Styles/ProfileTab.css";
import "./Styles/SearchPage.css";
import "./Styles/Chat.css";
import "./Styles/Message.css";
import "./Styles/NotFound.css";

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
import SearchPage from "./Pages/SearchPage";
import NotFound from "./Pages/NotFound";
import Chat from "./Pages/Chat";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const router = createBrowserRouter([
    {
      errorElement: <NotFound />,
    },
    {
      path: "/",
      element: <Login />,
    },
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
      path: "/profile/:profileName",
      element: <Profile />,
    },
    {
      path: "/post/:postId",
      element: <PostMain />,
    },
    {
      path: "/createpost",
      element: <CreatePost />,
    },
    {
      path: "/search/:searchValue",
      element: <SearchPage />,
    },
    {
      path: "/chat/:friendName",
      element: <Chat />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
