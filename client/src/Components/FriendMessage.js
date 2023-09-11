import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function FriendMessage(props) {
  return (
    <div id="FriendMessageDiv">
      <div id="FriendMessageContentContainer">
        <img src={props.Image} alt="" id="MessageImage"></img>
        <label id="MessageText">{props.text}</label>
      </div>
    </div>
  );
}

export default FriendMessage;
