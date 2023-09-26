import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import uploadImg from "../Resources/Images/upload.png";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required(`Must Write A Title!`)
    .max(30, `Title can't be longer than 30 characters`),
  description: yup
    .string()
    .max(300, "Description can't be longer than 300 characters")
    .notRequired(),
});

function CreatePost() {
  const [SubmitFailed, setSubmitFailed] = useState(false);
  const imageRef = useRef(null);
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();

    if (!(imageRef.current && imageRef.current.files[0])) {
      setSubmitFailed(true);
      console.log("Image is required");
      return;
    }

    if (formik.isValid) {
      const data = {
        image: imageRef.current.files[0] || null,
        title: formik.values.title || null,
        description: formik.values.description || null,
      };

      axios
        .post(`http://localhost:3001/post/create/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => Navigator(`/profile/${username}`))
        .catch((err) => {
          if (err.response.status === 401) {
            Navigator("/login");
          }
        });
      setSubmitFailed(false);

      return;
    } else {
      setSubmitFailed(true);

      return;
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={formik.handleSubmit} id="CreatePostContainer">
        <div id="CreatePostContainerTitle">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            {...formik.getFieldProps("title")}
          />
        </div>
        {formik.touched.title && formik.errors.title && SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.title} </label>
        ) : null}
        <div id="CreatePostContainerDescription">
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            rows="4"
            cols="50"
            {...formik.getFieldProps("description")}
          ></textarea>
        </div>
        {formik.touched.description &&
        formik.errors.description &&
        SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.description}</label>
        ) : null}
        <div id="CreatePostContainerFile">
          <label id="fileInputLabel" htmlFor="fileInput"></label>
          <input id="fileInput" type="file" ref={imageRef} />
        </div>
        {!(imageRef.current && imageRef.current.files[0]) && SubmitFailed ? (
          <label className="inputErrorMsg">Image is required.</label>
        ) : null}
        <button type="submit" onClick={handleSubmit}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
