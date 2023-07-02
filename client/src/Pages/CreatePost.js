import React from "react";

function CreatePost() {
  return (
    <div>
      <div id="CreatePostContainer">
        <div id="CreatePostContainerTitle">
          <label htmlFor="titleInput">Title:</label>
          <input id="titleInput" type="text" placeholder="Enter title" />
        </div>
        <div id="CreatePostContainerDescription">
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            placeholder="Enter description"
            rows="4"
            cols="50"
          />
        </div>
        <div id="CreatePostContainerFile">
          <label htmlFor="fileInput">Upload File:</label>
          <input id="fileInput" type="file" />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
