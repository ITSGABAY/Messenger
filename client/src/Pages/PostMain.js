import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

function PostMain() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getpostbypostid", {
        headers: { postid: "1" },
      })
      .then(async (response) => {
        setPostData(response.data);
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
