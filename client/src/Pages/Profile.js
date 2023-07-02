import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import Post from "./Post";
function Profile() {
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
        <Post />
      </div>
    </div>
  );
}

export default Profile;
