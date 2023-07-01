import React from "react";

function Post() {
  return (
    <div>
      <div className="PostContainer">
        <div className="PostimageFrame">
          <img id="1" />
        </div>
        <div className="PostProfileContainer">
          <label id="profileName">Yair Gabay</label>
          <img id="2" />
        </div>
        <div className="CommentsContainer"></div>
      </div>
    </div>
  );
}

export default Post;
