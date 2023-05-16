import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Password Validation
  const Validation = (values) => {
    const error = {};

    if (!values.name) {
      error.name = "Name is Required";
    }
    if (!values.username) {
      error.username = "Username is Required";
    }
    if (!values.email) {
      error.email = "Email is Required";
    }
    if (!values.password) {
      error.password = "Password is Required";
    }
    if (values.password < 8) {
      error.password = "Password must be greater then 8 characters";
    }
    if (!values.confirmPassword) {
      error.confirmPassword = "Confirm password is Required";
    }

    if (values.password !== values.confirmPassword) {
      error.confirmPassword = "password did'nt match";
    }

    return error;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setError(Validation(data));

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });

    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="registerForm">
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Name..."
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <div className="error">
            <p>{error.name}</p>
          </div>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <div className="error">
            <p>{error.email}</p>
          </div>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <div className="error">
            <p>{error.password}</p>
          </div>
          <input
            type="password"
            placeholder="confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
          <div className="error">
            <p>{error.confirmPassword}</p>
          </div>
          <button type="submit">Register</button>
        </form>
        <span className="loginPage">
          you already have an Account <Link to="/login">Login here</Link>.
        </span>
      </div>
    </>
  );
};

export default Register;
