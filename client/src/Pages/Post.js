import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import defaultLogo from "../Resources/Images/defaultLogo.png";
import submitIcon from "../Resources/Images/Send.png";
import Comment from "./Comment";
import { useNavigate, useMatch } from "react-router-dom";

function Post({ postData }) {
  const commentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [details, setDetails] = useState({});
  const Navigator = useNavigate();
  const match = useMatch("/post/:postId");
  useEffect(() => {
    if (postData && postData.comments) {
      const buffer = postData.image.data;
      var arrayBufferView = new Uint8Array(buffer);
      var blob = new Blob([arrayBufferView], { type: "image/png" });
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);

      setDetails({
        postId: postData.id,
        postImage: imageUrl,
        logoImage: null,
        title: postData.title,
        description: postData.description,
        userName: postData.username,
        comments: postData.comments,
      });
      setComments(postData.comments);
    }
  }, [postData]);

  const SubmitComment = () => {
    const comment = commentRef.current.value;
    axios
      .post(
        "http://localhost:3001/comment/create",
        { comment: comment },
        {
          headers: { postid: details.postId },
        }
      )
      .then((response) => {
        setComments(response.data);
        commentRef.current.value = "";
      });
  };

  return (
    <div id="PostContainer">
      <div
        id="PostimageFrame"
        onClick={() => {
          if (!match) {
            console.log("match::: ", match);
            console.log("details.postId::: ", details.postId);
            Navigator(`/post/${details.postId}`);
          }
        }}
      >
        <img id="PostImage" src={details.postImage} />
      </div>
      <div id="PostRightSide">
        <div id="PostRightSideTop">
          <div id="PostRightSideTopProfile">
            <img src={defaultLogo} id="PostImageLogo" alt="Profile" />
            <label id="PostProfileName">{details.userName}</label>
          </div>
          <div id="PostRightSideTopInfo">
            <label id="PostTitle">{details.title}</label>
            <label id="PostDescription">{details.description}</label>
          </div>
        </div>
        <div id="PostCommentsContainer">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                text={comment.text}
                username={comment.username}
                logo={comment.logoImage}
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
