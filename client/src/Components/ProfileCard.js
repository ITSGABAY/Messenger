import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import addPost from "../Resources/Images/add-post.png";
import editBtn from "../Resources/Images/edit.png";
import messageBtn from "../Resources/Images/message.png";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logoutLogo from "../Resources/Images/logout.png";
import Cookie from "js-cookie";
function ProfileCard(props) {
  const match = useMatch("/profile/:profileName");
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  return (
    <div>
      <div id="profileContainer" className="ProfilePageContainer">
        <div id="imageFrame">
          <img
            src={props.logoImage ? props.logoImage : defaultLogo}
            id="imageLogo"
            alt="Profile"
            onClick={() => {
              if (!match) {
                Navigator(`/profile/${props.username}`);
              }
            }}
          />
        </div>
        <div id="profileRightSide">
          <label
            id="profileName"
            onClick={() => {
              if (!match) {
                Navigator(`/profile/${props.username}`);
              }
            }}
          >
            {props.username}
          </label>
          <label
            id="ProfileDescription"
            onClick={() => {
              if (!match) {
                Navigator(`/profile/${props.username}`);
              }
            }}
          >
            {props.description}
          </label>
        </div>
        <div id="profileCardButtonContainer">
          {username != props.username && (
            <img
              id="messageBtn"
              onClick={() => Navigator(`/chat/${props.username}`)}
              src={messageBtn}
            ></img>
          )}
          {username == props.username && (
            <img
              id="createAPostBtn"
              onClick={() => Navigator(`/createpost`)}
              src={addPost}
            />
          )}
          {username == props.username && (
            <img
              id="editProfile"
              onClick={() => Navigator(`/editprofile`)}
              src={editBtn}
            />
          )}
          {username == props.username && (
            <img
              src={logoutLogo}
              id="NavBarLogoutLogo"
              alt="logout"
              onClick={() => {
                Cookie.set("access-token", "", { expires: 0.0001 });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
