import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";

function Comment(props) {
  return (
    <div id="Comment">
      <img src={defaultLogo} id="CommentLogo"></img>
      <div id="CommentTextContainer">
        <label id="CommentUserName">{props.username}</label>
        <label id="CommentText">{props.text}</label>
      </div>
    </div>
  );
}

export default Comment;
