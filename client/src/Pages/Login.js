import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
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
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        console.log(response.data.token);
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
