import { useContext, useState } from "react";
import "../App.css";
import "./login.css";

import loginIcon from "../images/login-icon.png";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authProvider";
import axios from "axios";

export const Login = () => {
  const clickHandler = async () => {
    try {
      const { data, status } = await axios.get("/api/users");
      if (status === 200) {
        console.log(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const { logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const guestDetails = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };

  // useState for storing login credentials

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  // LogIn handler

  const logInHandler = (credentials) => {
    const { username, password } = credentials;
    if (username.length && password.length > 0) {
      logInUser(credentials);
    } else {
      alert("Please enter your username and password");
    }
  };

  return (
    <div className="login-layout">
      {/* Left Side */}

      <div className="left-aside centre-align">
        <img alt="chatIcon" src={loginIcon} style={{ height: "100px" }} />
        <h1>Welcome to Babble...</h1>
      </div>

      {/* Right side */}

      <div className="right-aside centre-align">
        <h1>Login to continue...</h1>
        <div className="form">
          <h3>Username:</h3>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            placeholder="adarshbalika"
            className="text-field"
          ></input>
          <h3>Password:</h3>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            placeholder="adarshBalika123"
            type="password"
            className="text-field"
          ></input>
          <button onClick={() => logInHandler(userDetails)}>Login</button>
          <button onClick={() => logInHandler(guestDetails)}>
            Guest Login
          </button>
          <p
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Don't have an account yet? Click here to create a new one!
          </p>
        </div>
        <button onClick={clickHandler}>Show users</button>
      </div>
    </div>
  );
};
