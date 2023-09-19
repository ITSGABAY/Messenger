import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Post from "./Post";

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState({ username: null, logoImage: null });
  const [posts, setPosts] = useState([]);
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username, logoImage, description } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      Navigator("/login");
    } else {
      axios
        .get(`http://localhost:3001/home/`)
        .then(async (response) => {
          setUser(response.data.user);
          setPosts(response.data.posts);
          setProfiles(response.data.profiles);
        })
        .catch((err) => {
          if (err.response.status) {
            Navigator("/login");
          }
        });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div id="homePageDiv">
        <div id="homeRightSide">
          <div id="randomUsersContainer">
            {profiles.map((profile) => {
              var imageUrlLogo = null;
              if (profile.logoImage) {
                const buffer = profile.logoImage.data;
                var arrayBufferView = new Uint8Array(buffer);
                var blob = new Blob([arrayBufferView], { type: "image/png" });
                var urlCreator = window.URL || window.webkitURL;
                imageUrlLogo = urlCreator.createObjectURL(blob);
              }
              console.log("profile.username::: ", profile.username);
              console.log("imageUrlLogo::: ", profile);

              return (
                <div
                  id="randomUserContainer"
                  onClick={() => Navigator(`/profile/${profile.username}`)}
                >
                  <img
                    id="randomUserImage"
                    src={imageUrlLogo ? imageUrlLogo : defaultLogo}
                  />
                  <label id="randomUserName">{profile.username}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div id="homeMiddleSide">
          <div id="HomePostsContainer">
            {posts.map((post) => {
              return <Post postData={post} />;
            })}
          </div>
        </div>
        <div id="homeLeftSide">
          <div
            id="homeUserContainer"
            onClick={() => Navigator(`/profile/${username}`)}
          >
            <img id="homeUserImage" src={logoImage ? logoImage : defaultLogo} />
            <label id="randomUserName">{username}</label>
            <label id="homeUserDescription">{description}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
