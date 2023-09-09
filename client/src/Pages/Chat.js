import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import submitIcon from "../Resources/Images/message.png";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import Message from "../Components/Message";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

function Chat() {
  const socket = useRef(null);

  const MessageRef = useRef("");
  const imageRef = useRef(null);
  const [messages, setMessages] = useState([]);
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
    socket.current = io.connect("http://localhost:3001");

    socket.current.on("receive_message", (message) => {
      socket.current = io.connect("http://localhost:3001");

      socket.current.on("receive_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios
      .post(`http://localhost:3001/chat/getMessages/${friendName}`)
      .then((response) => {
        setMessages(response.data);
        console.log("messages::: ", messages);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);
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
          socket.current.emit("send_message", {
            text: MessageRef.current.value,
          });
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
            {messages.map((message) => {
              if (message.Image) {
                const buffer = message.Image.data;
                var arrayBufferView = new Uint8Array(buffer);
                var blob = new Blob([arrayBufferView], { type: "image/png" });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
              }
              return <Message text={message.Text} Image={imageUrl} />;
            })}
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
