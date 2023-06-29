import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./authProvider";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const { currentUser } = authData;

  // Post reducer func

  const reducerFunc = (state, action) => {
    console.log({ state, action });
    switch (action.type) {
      case "SET_ALL_POSTS":
        return { ...state, allPosts: action.payload };

      default:
        break;
    }
  };

  // Post useReducer defined here

  const [postData, postDispatch] = useReducer(reducerFunc, {
    allPosts: [],
  });

  const getAllPosts = async () => {
    try {
      const { status, data } = await axios.get("/api/posts");
      if (status === 200) {
        postDispatch({ type: "SET_ALL_POSTS", payload: [...data.posts] });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        postData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
