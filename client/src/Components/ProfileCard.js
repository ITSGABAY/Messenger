import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import { useMatch, useNavigate } from "react-router-dom";

function ProfileCard(props) {
  const match = useMatch("/profile/:profileName");
  const Navigator = useNavigate();
  return (
    <div>
      <div1
        id="profileContainer"
        className="ProfilePageContainer"
        onClick={() => {
          if (!match) {
            Navigator(`/profile/${props.username}`);
          }
        }}
      >
        <div id="imageFrame">
          <img
            src={props.logoImage ? props.logoImage : defaultLogo}
            id="imageLogo"
            alt="Profile"
          />
        </div>
        <div id="profileRightSide">
          <label id="profileName">{props.username}</label>
          <label id="ProfileDescription">{props.description}</label>
          <btn id="messageBtn">Message </btn>
        </div>
      </div1>
    </div>
  );
}

export default ProfileCard;
