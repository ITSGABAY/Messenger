import defaultLogo from "../Resources/Images/defaultLogo.png";
import Post from "./Post";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [details, setDetails] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getpostsbyuserid", {
        headers: { userid: "2" },
      })
      .then(async (response) => {
        setPosts(response.data);
      });
  }, []);
  return (
    <div className="PageDiv">
      <div id="profileContainer" class="ProfilePageContainer">
        <div id="imageFrame">
          <img src={defaultLogo} id="imageLogo" alt="Profile" />
        </div>
        <div id="profileRightSide">
          {" "}
          <label id="profileName">Yair Gabay</label>
          <label id="ProfileDescription">
            Now is the winter of our discontent Made glorious summer by this sun
            of York;
          </label>
        </div>
      </div>
      <div className="ProfilePageContainer" id="PostsContainer">
        {posts.map((post) => {
          return <Post postData={post} />;
        })}
      </div>
    </div>
  );
}

export default Profile;
