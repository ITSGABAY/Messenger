import { useFormik } from "formik";
import React from "react";
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
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      axios
        .post("http://localhost:3001/auth/Register", data)
        .then((response) => {
          console.log(response);
        });
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:3001/auth/Register", values)
        .then((response) => {
          console.log(response);
        });
    },
  });

  return (
    <div className="registrationContainer">
      <div className="title">
        <label id="title">Registration</label>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button type="submit">Submit</button>
      </form>
      <a href="/login">Have a User Already? Login</a>
    </div>
  );
}

export default Registration;
