import { useFormik } from "formik";
import React from "react";
import axios from "axios";

function Registration() {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const registration = () => {
    const data = {
      username: formik.values.username,
      password: formik.values.password,
      email: formik.values.email,
    };
    axios.post("http://localhost:3001/auth/Register", data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="registrationContainer">
      <div className="title">
        <label id="title">Registration</label>
      </div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...formik.getFieldProps("username")}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...formik.getFieldProps("email")}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        <button type="button" onClick={registration}>
          Submit
        </button>
      </form>
      <a href="/login">Have a User Already? Login</a>
    </div>
  );
}

export default Registration;
