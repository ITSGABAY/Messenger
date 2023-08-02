import React, { useState, useContext, useEffect } from "react"; // add useEffect here
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function CreatePost() {
  const Navigator = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  axios.defaults.withCredentials = true;

  const SubmitPost = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
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
      <div id="CreatePostContainer">
        <div id="CreatePostContainerTitle">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div id="CreatePostContainerDescription">
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            placeholder="Enter description"
            rows="4"
            cols="50"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div id="CreatePostContainerFile">
          <label htmlFor="fileInput">Upload File:</label>
          <input
            id="fileInput"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <button id="CreatePostSubmitButton" onClick={SubmitPost}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
