import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import uploadImg from "../Resources/Images/upload.png";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(15, "Username can't be longer than 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/,
      "Username must contain both letters and numbers"
    )
    .notRequired(),
  description: yup
    .string()
    .max(200, "Description can't be longer than 200 characters")
    .notRequired(),
});

function EditProfile() {
  const [SubmitFailed, setSubmitFailed] = useState(false);
  const imageRef = useRef(null);
  const Navigator = useNavigate();
  const { isAuthenticated, userId, username, description } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      Navigator("/login");
    }
  }, [isAuthenticated, Navigator]);

  const formik = useFormik({
    initialValues: {
      username: "",
      description: "",
    },
    validationSchema,
  });

  const handleCustomSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();

    console.log(
      "🚀 ~ file: EditProfile.js:49 ~ EditProfile ~ formik.isValid:",
      formik.isValid
    );

    if (formik.isValid) {
      const data = {
        image: imageRef.current.files[0] || null,
        username: formik.values.username || null,
        description: formik.values.description || null,
      };

      console.log("🚀 ~ file: EditProfile.js:54 ~ EditProfile ~ data:", data);

      axios
        .post(`http://localhost:3001/profile/edit/${userId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => console.log(response))
        .catch((err) => {
          if (err.response.status) {
            Navigator("/login");
          }
        });
      setSubmitFailed(false);

      return;
    } else {
      setSubmitFailed(true);
      console.log(
        "🚀 ~ file: EditProfile.js:72 ~ EditProfile ~ SubmitFailed:",
        SubmitFailed
      );
      return;
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={formik.handleSubmit} id="EditProfileContainer">
        <div id="EditProfileUsername">
          <label htmlFor="usernameInput">Username:</label>
          <input
            id="usernameInput"
            type="text"
            placeholder={username}
            {...formik.getFieldProps("username")}
          />
        </div>
        {formik.touched.username && formik.errors.username && SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.username} </label>
        ) : null}
        <div id="EditProfileDescription">
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            placeholder={description}
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
        <div id="EditProfileFile">
          <label id="fileInputLabel" htmlFor="fileInput"></label>
          <input id="fileInput" type="file" ref={imageRef} />
        </div>
        <button type="submit" onClick={handleCustomSubmit}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
