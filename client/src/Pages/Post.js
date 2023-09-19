import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import submitIcon from "../Resources/Images/comment.png";
import Comment from "../Components/Comment";
import { useNavigate, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ postData }) {
  const commentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [details, setDetails] = useState({ logoImage: null });
  const Navigator = useNavigate();
  const match = useMatch("/post/:postId");
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let logoImageUrl = null;
    if (postData && postData.comments) {
      const buffer = postData.image.data;
      var arrayBufferView = new Uint8Array(buffer);
      var blob = new Blob([arrayBufferView], { type: "image/png" });
      var urlCreator = window.URL || window.webkitURL;
      var postImageUrl = urlCreator.createObjectURL(blob);
    }
    if (postData.logoImage) {
      const buffer = postData.logoImage.data;
      var arrayBufferView = new Uint8Array(buffer);
      var blob = new Blob([arrayBufferView], { type: "image/png" });
      var urlCreator = window.URL || window.webkitURL;
      logoImageUrl = urlCreator.createObjectURL(blob);
    }
    setDetails({
      postId: postData.id,
      postImage: postImageUrl,
      logoImage: logoImageUrl,
      title: postData.title,
      description: postData.description,
      userName: postData.username,
      comments: postData.comments,
    });
    setComments(postData.comments);
  }, [postData]);

  const SubmitComment = () => {
    const comment = commentRef.current.value;
    axios
      .post(`http://localhost:3001/comment/create/${details.postId}`, {
        comment: comment,
      })
      .then((response) => {
        setComments((prevComments) => [
          ...prevComments,
          { text: comment, username: username },
        ]);

        commentRef.current.value = "";
      })
      .catch((err) => {
        if (err.response.status) {
          Navigator("/login");
        }
      });
  };

  return (
    <div id="PostContainer">
      <div
        id="PostimageFrame"
        onClick={() => {
          if (!match) {
            Navigator(`/post/${details.postId}`);
          }
        }}
      >
        <img id="PostImage" src={details.postImage} />
      </div>
      <div id="PostRightSide">
        <div id="PostRightSideTop">
          <div id="PostRightSideTopProfile">
            <img
              src={details.logoImage ? details.logoImage : defaultLogo}
              id="PostImageLogo"
              alt="Profile"
            />
            <label id="PostProfileName">{details.userName}</label>
          </div>
          <div id="PostRightSideTopInfo">
            <label id="PostTitle">{details.title}</label>
            <label id="PostDescription">{details.description}</label>
          </div>
        </div>
        <div id="PostCommentsContainer">
          {comments.map((comment) => {
            let commentLogo = null;
            if (comment.logoImage) {
              const buffer = comment.logoImage.data;
              var arrayBufferView = new Uint8Array(buffer);
              var blob = new Blob([arrayBufferView], { type: "image/png" });
              var urlCreator = window.URL || window.webkitURL;
              commentLogo = urlCreator.createObjectURL(blob);
            }
            return (
              <Comment
                key={comment.id}
                text={comment.text}
                username={comment.username}
                logo={commentLogo}
              />
            );
          })}
        </div>

        <div id="addCommentContainer">
          <textarea
            id="addCommentInput"
            type="text"
            placeholder="Enter Comment"
            ref={commentRef}
          />
          <img
            id="submitComment"
            src={submitIcon}
            onClick={SubmitComment}
            alt="Submit"
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
