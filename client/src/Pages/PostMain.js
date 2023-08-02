import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

function PostMain() {
  const [postData, setPostData] = useState(null);
  const Navigator = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getpostbypostid", {
        headers: { postid: "1" },
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
      <div className="PageDiv">
        <div id="PostMainContainer">
          <Post postData={postData} />
        </div>
      </div>
    </div>
  );
}

export default PostMain;
