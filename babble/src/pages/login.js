import { useContext } from "react";
import "../App.css";
import "./login.css";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authProvider";

export const Login = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="login-grid-layout">
      {/* Left Side */}

      <div className="left-aside centre-align">
        <img src="../images/login-icon.png" alt="Chat" />
      </div>

      {/* Right side */}

      <div className="right-aside centre-align">
        <h1>Welcome to Babble!</h1>
        <form className="form">
          <h3>Username:</h3>
          <input placeholder="adarshbalika" className="text-field"></input>
          <h3>Password:</h3>
          <input
            placeholder="adarshBalika123"
            type="password"
            className="text-field"
          ></input>
          <button>Login</button>
          <p
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Don't have an account yet? Click here to create a new one!
          </p>
        </form>
      </div>
    </div>
  );
};
