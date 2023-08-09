import React, { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import submitIcon from "../Resources/Images/message.png";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import Message from "../Components/Message";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Chat() {
  const MessageRef = useRef("");
  const imageRef = useRef(null);
  const { friendName } = useParams();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );
  let receiverId = null;

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      SendMessage();
    }
  };
  useEffect(() => {
    axios
      .post(`http://localhost:3001/chat/addmessage/${friendName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const SendMessage = () => {
    if (MessageRef.current.value.trim() !== "") {
      const formData = new FormData();
      formData.append("text", MessageRef.current.value);
      if (imageRef.current.files[0]) {
        formData.append("image", imageRef.current.files[0]);
      }

      axios
        .post(`http://localhost:3001/chat/addmessage/${friendName}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div id="ChatPageDiv">
        <div id="ChatDiv">
          <div id="DmName">
            <label id="FriendName">{friendName}</label>
          </div>
          <div id="messageContainer">
            <Message />
          </div>
          <div id="AddCommentContainer">
            <input id="MessageImageInput" type="file" ref={imageRef} />
            <textarea
              id="addMessageInput"
              type="text"
              placeholder="Enter Comment"
              onKeyDown={handleEnter}
              ref={MessageRef}
            />
            <img
              id="SendMessage"
              src={submitIcon}
              alt="Submit"
              onClick={SendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
