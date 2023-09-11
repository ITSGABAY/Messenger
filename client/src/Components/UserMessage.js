import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function UserMessage(props) {
  return (
    <div id="UserMessageDiv">
      <div id="UserMessageContentContainer">
        <img src={props.Image} alt="" id="MessageImage"></img>
        <label id="MessageText">{props.text}</label>
      </div>
    </div>
  );
}

export default UserMessage;
