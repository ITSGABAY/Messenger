import Post from "./Post";
import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileCard from "../Components/ProfileCard";
function Profile() {
  const [profileData, setProfileData] = useState({ posts: [] });
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );
  const Navigator = useNavigate();
  const { profileName } = useParams();

  useEffect(() => {
    //runs twice because of react strict mode
    if (!isAuthenticated) {
      Navigator("/login");
    } else {
      axios
        .get(`http://localhost:3001/profile/getprofiledata/${profileName}`)
        .then(async (response) => {
          await setProfileData({
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

            Navigator("/login");
          }
        });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className="PageDiv">
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
