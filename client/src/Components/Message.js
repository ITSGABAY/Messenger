import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function Message(props) {
  return (
    <div id="MessageDiv">
      <div id="MessageContentContainer">
        <img src={props.Image} alt="" id="MessageImage"></img>
        <label id="MessageText">{props.text}</label>
      </div>
    </div>
  );
}

export default Message;
