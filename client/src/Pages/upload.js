import React, { useState, useEffect } from "react";
import axios from "axios";
const FormData = require("form-data");

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [viewImage, setViewImage] = useState(null);

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const upload = () => {
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          id: "1",
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const imageData = response.data;
        const blob = new Blob([imageData], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setViewImage(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="uploadcontainer">
      <input type="file" onChange={handleImageSelect} />
      <button onClick={upload}>Upload</button>
      {viewImage && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={viewImage} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
