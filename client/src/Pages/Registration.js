import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
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
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password can't be longer than 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
      "Password must contain both letters and numbers"
    )
    .required("Password is required"),
});

function Registration() {
  const [SubmitFailed, setSubmitFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
  });

  const handleSubmit = (event) => {
    console.log(
      "🚀 ~ file: Registration.js:51 ~ handleCustomSubmit ~ formik.isValid:",
      formik.isValid
    );
    event.preventDefault();
    formik.handleSubmit();
    setSubmitFailed(!formik.isValid);
    if (formik.isValid) {
      const data = {
        username: formik.values.username,
        password: formik.values.password,
        email: formik.values.email,
      };

      axios
        .post("http://localhost:3001/auth/Register", data)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          // Handle error here, if necessary
          console.error("Registration error:", err);
        });

      setSubmitFailed(false);
    } else {
      setSubmitFailed(true);
    }
  };

  return (
    <div className="registrationContainer">
      <div className="title">
        <label id="title">Registration</label>
      </div>
      <form id="RegistrationForm" onSubmit={formik.handleSubmit}>
        <label id="registerLabelUsername" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.username}</label>
        ) : null}
        <label id="registerLabelEmail" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          placeholder="Enter your email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.email}</label>
        ) : null}
        <label id="registerLabelPassword" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && SubmitFailed ? (
          <label className="inputErrorMsg">{formik.errors.password}</label>
        ) : null}
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <a href="/login">Have a User Already? Login</a>
    </div>
  );
}

export default Registration;
