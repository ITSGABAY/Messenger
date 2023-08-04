import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import NavBar from "./NavBar";

function PostMain() {
  const [postData, setPostData] = useState(null);
  const Navigator = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getpostbypostid", {
        headers: { postid: postId },
      })
      .then(async (response) => {
        setPostData(response.data);
      })
      .catch((err) => {
        if (err.response.status) {
          console.log("err::: ", err);
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
