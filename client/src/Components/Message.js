import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function Message() {
  return (
    <div id="MessageDiv">
      <div id="MessageContentContainer">
        <img src={defaultLogo} alt="" id="MessageImage"></img>
        <label id="MessageText">Message!!!!!!!!</label>
      </div>
    </div>
  );
}

export default Message;
