import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import submitIcon from "../Resources/Images/message.png";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import UserMessage from "../Components/UserMessage";
import FriendMessage from "../Components/FriendMessage";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
function Chat() {
  const Navigator = useNavigate();
  const MessageRef = useRef("");
  const imageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { friendName } = useParams();
  const [socket, setSocket] = useState(null);
  let receiverId = null;
  const { isAuthenticated, userId, username, logoImage } = useSelector(
    (state) => state.auth
  );

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      SendMessage();
    }
  };
  useEffect(() => {
    console.log("friendName == username::: ", friendName, username);
    if (friendName == username) {
      Navigator(`profile/${friendName}`);
    }
    const msgFilter = `${friendName}>${username}`;
    const newSocket = io("http://localhost:3001", {
      query: { msgFilter },
    });
    setSocket(newSocket);
    newSocket.on("serverToClient", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { Text: message.text, Image: message.image },
      ]);
      console.log("Messages::: ", messages);
    });

    axios
      .post(`http://localhost:3001/chat/getMessages/${friendName}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      newSocket.close();
    };
  }, []);

  const SendMessage = () => {
    if (MessageRef.current.value.trim() !== "") {
      const data = {
        text: MessageRef.current.value,
        msgFilter: `${username}>${friendName}`,
      };
      data.image = null;
      if (imageRef.current.files[0]) {
        data.image = imageRef.current.files[0];
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { Text: data.text, Image: data.image },
      ]);

      console.log(messages);

      if (socket) {
        socket.emit("clientToServer", data);
      }

      const formData = new FormData();
      formData.append("text", data.text);
      if (data.image) {
        formData.append("image", data.image);
      }

      axios
        .post(`http://localhost:3001/chat/addmessage/${friendName}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
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
                if (message.Image instanceof File) {
                  imageUrl = URL.createObjectURL(message.Image);
                } else {
                  const buffer = message.Image.data || message.Image;
                  var arrayBufferView = new Uint8Array(buffer);
                  var blob = new Blob([arrayBufferView], { type: "image/png" });
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL(blob);
                }
              }
              return message.SenderId == userId ? (
                <UserMessage text={message.Text} Image={imageUrl} />
              ) : (
                <FriendMessage text={message.Text} Image={imageUrl} />
              );
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
