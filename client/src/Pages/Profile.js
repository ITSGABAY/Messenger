import defaultLogo from "../Resources/Images/defaultLogo.png";
import Post from "./Post";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const [details, setDetails] = useState({});
  const [profileData, setProfileData] = useState({ posts: [] });
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const { profileName } = useParams();

  useEffect(() => {
    console.log("profileName::: ", profileName);

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/profile/getprofiledata", {
          headers: { profilename: profileName },
        })
        .then(async (response) => {
          setProfileData({
            username: response.data.username,
            id: response.data.id,
            posts: response.data.posts,
            description: response.data.description,
            logoImage: response.data.logoImage,
          });
        })
        .catch((err) => {
          if (err.response.status) {
            console.log("err::: ", err);
            navigate("/login");
          }
        });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="PageDiv">
      <div id="profileContainer" class="ProfilePageContainer">
        <div id="imageFrame">
          <img
            src={profileData.logoImage ? profileData.logoImage : defaultLogo}
            id="imageLogo"
            alt="Profile"
          />
        </div>
        <div id="profileRightSide">
          {" "}
          <label id="profileName">{profileData.username}</label>
          <label id="ProfileDescription">{profileData.description}</label>
        </div>
      </div>
      <div className="ProfilePageContainer" id="PostsContainer">
        {profileData.posts.map((post) => {
          return <Post postData={post} />;
        })}
      </div>
    </div>
  );
}

export default Profile;
