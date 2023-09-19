import React from "react";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Comment(props) {
  const Navigator = useNavigate();

  return (
    <div id="Comment">
      <img
        onClick={() => {
          Navigator(`/profile/${props.username}`);
        }}
        src={props.logo ? props.logo : defaultLogo}
        id="CommentLogo"
      ></img>
      <div id="CommentTextContainer">
        <label
          id="CommentUserName"
          onClick={() => {
            Navigator(`/profile/${props.username}`);
          }}
        >
          {props.username}
        </label>
        <label id="CommentText">{props.text}</label>
      </div>
    </div>
  );
}

export default Comment;
