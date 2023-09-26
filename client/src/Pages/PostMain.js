import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../Components/Post";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

function PostMain() {
  const [postData, setPostData] = useState(null);
  const Navigator = useNavigate();
  const { postId } = useParams();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/getpostbypostid/${postId}`)
      .then(async (response) => {
        setPostData(response.data);

        console.log(
          "🚀 ~ file: PostMain.js:22 ~ .then ~ response.data:",
          response.data
        );
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Navigator("/login");
        }
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="PageDiv">
        <div id="PostMainContainer">
          <Post postData={postData} />
        </div>
      </div>
    </div>
  );
}

export default PostMain;
