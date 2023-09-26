import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [SubmitFailed, setSubmitFailed] = useState(false);
  const Navigator = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userId, username } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const handleSubmit = () => {
    const data = {
      username: formik.values.username,
      password: formik.values.password,
    };

    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        var imageUrl = null;
        if (response.status === 200) {
          console.log(
            "🚀 ~ file: Login.js:36 ~ .then ~ response.status === 200:",
            response.status === 200
          );

          if (response.data.logoImage) {
            const buffer = response.data.logoImage.data;
            var arrayBufferView = new Uint8Array(buffer);
            var blob = new Blob([arrayBufferView], { type: "image/png" });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
          }
          dispatch(
            login({
              userId: response.data.userId,
              username: response.data.username,
              logoImage: imageUrl,
              description: response.data.description,
            })
          );

          Navigator("/");
        }
      })
      .catch((error) => {
        setSubmitFailed(true);
        if (error.response && error.response.status === 400) {
          console.error(error.response.data.error);
        } else {
          console.error("Unexpected error:", error.message);
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="title">
        <label id="Logintitle">Login</label>
      </div>
      <form onSubmit={formik.handleSubmit} id="loginForm">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...formik.getFieldProps("username")}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        <div id="loginErrorContainer">
          {SubmitFailed && (
            <label className="inputErrorMsg">
              Username Or Password Isn't Right!
            </label>
          )}
        </div>
        <button type="submit" onClick={handleSubmit} className="AB">
          Submit
        </button>
      </form>

      <a href="/register" className="AB">
        Don't have an account? Register
      </a>
    </div>
  );
}

export default Login;
