import React, { useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  console.log("this is username: ", credentials.username);
  console.log("this is password: ", credentials.password);

  const handleLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log("this is res in handleLogin: ", res);
        localStorage.setItem("token", res.data.payload);
        console.log("this is localstorage.token: ", localStorage.token);
        props.history.push("/bubblePage");
      })
    .catch(err => {
      localStorage.removeItem("token");
      console.log("invalid login", err);
    });
    setCredentials({
      username: "",
      password: ""
    });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <h3>Sign-in</h3>
        <form className="form-style" onSubmit={handleLogin}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <label className="label-style">Password: </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="button-style">Log in</button>
        </form>
    </div>
  );
};

export default Login;
