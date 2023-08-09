import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

axios.defaults.withCredentials = true;

function CreatePost() {
  const Navigator = useNavigate();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const imageRef = useRef(null);

  axios.defaults.withCredentials = true;

  const SubmitPost = () => {
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    axios
      .post("http://localhost:3001/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err.response.status) {
          console.log("err::: ", err);
          Navigator("/login");
        }
      });
  };

  return (
    <div>
      <NavBar />
      <div id="CreatePostContainer">
        <div id="CreatePostContainerTitle">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            placeholder="Enter title"
            ref={titleRef}
          />
        </div>
        <div id="CreatePostContainerDescription">
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            placeholder="Enter description"
            rows="4"
            cols="50"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div id="CreatePostContainerFile">
          <label htmlFor="fileInput">Upload File:</label>
          <input id="fileInput" type="file" ref={imageRef} />
        </div>
        <button id="CreatePostSubmitButton" onClick={SubmitPost}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
