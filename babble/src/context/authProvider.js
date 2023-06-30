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

      case "LOGOUT":
        return { ...state, isLoggedIn: false, currentUser: {} };

      case "SET_SUGGESTED_USERS":
        return { ...state, suggestedUsers: action.payload };

      default:
        break;
    }
  };

  // Setting up useReducer

  const [authData, authDispatch] = useReducer(reducerFunc, {
    isLoggedIn: false,
    currentUser: {},
    allUsers: [],
    suggestedUsers: [],
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

  // Logout user

  const logoutHandler = () => {
    alert("Logged out");
    localStorage.removeItem("encodedToken");
    authDispatch({ type: "LOGOUT" });
    navigate("/login");
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

  useEffect(() => {
    getAllUsers();
  }, [authData.currentUser]);

  // Show suggested users

  const showSuggestedUsers = () => {
    const userList = authData.allUsers.filter(
      (user) => user._id !== authData.currentUser._id
    );
    authDispatch({ type: "SET_SUGGESTED_USERS", payload: [...userList] });
  };

  useEffect(() => {
    showSuggestedUsers();
  }, [authData.allUsers]);

  // follow user function
  const token = localStorage.getItem("encodedToken");

  const followUserHandler = async (followUserID) => {
    try {
      const {
        status,
        data: { user },
      } = await axios.post(
        `/api/users/follow/${followUserID}/`,
        {},
        {
          headers: { authorization: token },
        }
      );

      // For 200 status, Success scenario
      if (status === 200) {
        alert("User followed");
        authDispatch({ type: "SET_CURRENT_USER", payload: { ...user } });
      }

      if (status === 400) {
        alert("You already follow this user");
      }
    } catch (error) {
      if (error.status) {
        const { status, data } = error.response;
        alert(`Error code: ${status} Message: ${data.errors[0]}`);
      } else {
        alert(error);
      }
    }
  };

  // Unfollow user function

  const unfollowUserHandler = async (unfollowUserID) => {
    try {
      const {
        status,
        data: { user },
      } = await axios.post(
        `/api/users/unfollow/${unfollowUserID}/`,
        {},
        {
          headers: { authorization: token },
        }
      );

      // For 200 status, Success scenario
      if (status === 200) {
        alert("User unfollowed");
        authDispatch({ type: "SET_CURRENT_USER", payload: { ...user } });
      }

      if (status === 400) {
        alert("You don't follow this user");
      }
    } catch (error) {
      if (error.status) {
        const { status, data } = error.response;
        alert(`Error code: ${status} Message: ${data.errors[0]}`);
      } else {
        alert(error);
      }
    }
  };

  // Functionalities end here

  return (
    <AuthContext.Provider
      value={{
        authData,
        authDispatch,
        signUp,
        logInUser,
        logoutHandler,
        followUserHandler,
        unfollowUserHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
