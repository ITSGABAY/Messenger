import React, { useState, useEffect } from "react";
import axios from "axios";
import Buffer from "buffer";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import { imagefrombuffer } from "imagefrombuffer";
function Post() {
  const [viewImage, setViewImage] = useState(null);
  useEffect(() => {
    const data = { postid: "1" };
    axios
      .get("http://localhost:3001/post/getbypostid", {
        headers: { postid: "1" },
      })
      .then((response) => {
        console.log("response::: ", response);

        console.log("data image", response.data.image);
        const buffer = response.data.image.data;
        var arrayBufferView = new Uint8Array(buffer);
        console.log("arrayBufferView::: ", arrayBufferView);
        var blob = new Blob([arrayBufferView], { type: "image/png" });
        console.log("blob::: ", blob);
        var urlCreator = window.URL || window.webkitURL;
        console.log("urlCreator::: ", urlCreator);
        var imageUrl = urlCreator.createObjectURL(blob);
        setViewImage(imageUrl);
      });
  }, []);
  return (
    <div>
      <div id="PostContainer">
        <div id="PostimageFrame">
          <img id="1" src={viewImage} />
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
