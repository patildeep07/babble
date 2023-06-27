import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Navigate
  const navigate = useNavigate();

  // Reducer function
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return { ...state, isLoggedIn: true, currentUser: action.payload };

      case "SET_ALL_USERS":
        return { ...state, allUsers: action.payload };
      default:
        break;
    }
  };

  // Setting up useReducer

  const [authData, authDispatch] = useReducer(reducerFunc, {
    isLoggedIn: false,
    currentUser: {},
    allUsers: [],
  });

  // Creating a new user function (i.e. Sign Up)

  const signUp = async (credentials) => {
    try {
      const { status } = await axios.post("/api/auth/signup", credentials);
      if (status === 201) {
        alert("User created. You can proceed to login");
        getAllUsers();
      } else if (status === 422) {
        alert(`Username already exists!`);
      }
    } catch (error) {
      alert(error);
    }
  };

  // Login into the user (i.e. Log in)

  const logInUser = async (credentials) => {
    try {
      const { status, data } = await axios.post("/api/auth/login", credentials);
      const { encodedToken, foundUser } = data;
      if (status === 200) {
        alert("Successfully logged in");
        authDispatch({ type: "SET_CURRENT_USER", payload: foundUser });
        localStorage.setItem("encodedToken", encodedToken);
        navigate("/profile");
      }
    } catch (error) {
      alert(error);
    }
  };

  // Show all users available

  const getAllUsers = async () => {
    try {
      const {
        data: { users },
      } = await axios.get("/api/users");
      authDispatch({ type: "SET_ALL_USERS", payload: users });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
        authDispatch,
        signUp,
        logInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
