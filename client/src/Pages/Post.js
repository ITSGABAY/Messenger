import React, { useState, useEffect } from "react";
import axios from "axios";

import defaultLogo from "../Resources/Images/defaultLogo.png";

function Post() {
  useEffect(() => {
    const data = { postid: "1" };
    axios
      .get("http://localhost:3001/post/getbypostid", {
        headers: { postid: "1" },
      })
      .then((response) => {
        console.log(response.data);
        const formData = response.data; // Assuming the server sends the form data as the response
        const image = formData.image; // Get the value of the "image" field
        const title = formData.title; // Get the value of the "title" field
        const description = formData.description; // Get the value of the "description" field
        const username = formData.username; // Get the value of the "username" field
        const logoImage = formData.logoImage; // Get the value of the "logoImage" field

        // Do something with the extracted form data
        console.log(image);
        console.log(title);
        console.log(description);
        console.log(username);
        console.log(logoImage);
      });
  });
  return (
    <div>
      <div id="PostContainer">
        <div id="PostimageFrame">
          <img id="1" />
        </div>
        <div id="PostRightSide">
          <div id="PostRightSideProfileTop">
            <img src={defaultLogo} id="PostImageLogo" alt="Profile" />
            <label id="PostProfileName">Yair Gabay</label>
          </div>
          <div id="PostCommentsContainer"></div>
        </div>
      </div>
    </div>
  );
}

export default Post;
