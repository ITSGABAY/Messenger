import React from "react";

import defaultLogo from "../Resources/Images/defaultLogo.png";

function Post() {
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
