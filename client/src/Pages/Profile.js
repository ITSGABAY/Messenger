import Post from "../Components/Post";
import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileCard from "../Components/ProfileCard";
function Profile() {
  const [profileData, setProfileData] = useState({ posts: [] });
  const { isAuthenticated, userId, username, description, logoImage } =
    useSelector((state) => state.auth);
  const Navigator = useNavigate();
  const { profileName } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/profile/getprofiledata/${profileName}`)
      .then(async (response) => {
        let imageUrlLogo = null;
        if (response.data.logoImage) {
          const buffer = response.data.logoImage.data;
          var arrayBufferView = new Uint8Array(buffer);
          var blob = new Blob([arrayBufferView], { type: "image/png" });
          var urlCreator = window.URL || window.webkitURL;
          imageUrlLogo = urlCreator.createObjectURL(blob);
        }
        await setProfileData({
          username: response.data.username,
          id: response.data.id,
          posts: response.data.posts,
          description: response.data.description,
          logoImage: imageUrlLogo,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          Navigator("/404");
        }
        if (err.response.status === 401) {
          Navigator("/login");
        }
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div id="ProfilePageDiv">
        <div id="ProfileCardContainer">
          <ProfileCard
            username={profileData.username}
            description={profileData.description}
            logoImage={profileData.logoImage}
          />
        </div>
        <div className="ProfilePageContainer" id="PostsContainer">
          {profileData.posts.map((post) => {
            return <Post postData={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
