import { useContext, useState } from "react";
import "../App.css";
import "./login.css";

import { useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

import { AuthContext } from "../context/authProvider";

import avatarImage from "../backend/db/avatars/Avatar-1.png";

export const Signup = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  // useState for storing details of new user

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    avatar: avatarImage,
  });

  // SignUp handler function

  const signUpHandler = (credentials) => {
    const { firstName, lastName, username, password, confirmPassword } =
      credentials;

    if (
      firstName.length &&
      lastName.length &&
      username.length &&
      password.length &&
      confirmPassword.length > 0
    ) {
      if (password === confirmPassword) {
        signUp(credentials);
        navigate("/login");
      } else {
        toast.error("Your passwords aren't matching");
      }
    } else {
      toast.error("Please enter all the fields");
    }
  };

  return (
    <div className="login-layout">
      {/* Left Side */}

      <div className="left-aside centre-align">
        <div className="icon-image"></div>
        <h1>Welcome to Babble...</h1>
      </div>

      {/* Right side */}

      <div className="right-aside centre-align">
        <h1>Create a new account...</h1>
        <div className="form">
          <h3>First Name:</h3>
          <input
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            placeholder="Adarsh"
            className="text-field"
          ></input>
          <h3>Last Name:</h3>
          <input
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            placeholder="Balika"
            className="text-field"
          ></input>
          <h3>Username:</h3>
          <input
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            placeholder="adarshbalika"
            className="text-field"
          ></input>
          <h3>Password:</h3>
          <input
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            placeholder="adarshBalika123"
            type="password"
            className="text-field"
          ></input>
          <h3>Confirm password:</h3>
          <input
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
            placeholder="adarshBalika123"
            type="password"
            className="text-field"
          ></input>
          <button onClick={() => signUpHandler(newUser)}>Signup</button>
          <p
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Already have an account? Click here to login!
          </p>
        </div>
      </div>
    </div>
  );
};
