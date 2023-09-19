import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
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
    onSubmit: (values) => {
      const data = {
        username: values.username,
        password: values.password,
      };
      axios
        .post("http://localhost:3001/auth/login", data)
        .then((response) => {
          var imageUrl = null;
          console.log(response.data.description);
          if (response.status === 200) {
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
          if (error.response && error.response.status === 400) {
            console.error(error.response.data.error);
          } else {
            console.error("Unexpected error:", error.message);
          }
        });
    },
  });

  return (
    <div className="loginContainer">
      <div className="title">
        <label id="Logintitle">Login</label>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit" className="AB">
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
