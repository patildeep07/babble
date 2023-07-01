import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./authProvider";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const { currentUser, suggestedUsers, allUsers } = authData;

  // Post reducer func

  const postReducerFunc = (state, action) => {
    // console.log({ state, action });
    switch (action.type) {
      case "SET_ALL_POSTS":
        return { ...state, allPosts: action.payload };

      case "SET_SUGGESTED_POSTS":
        return { ...state, suggestedPosts: action.payload };

      default:
        break;
    }
  };

  // Post useReducer defined here

  const [postData, postDispatch] = useReducer(postReducerFunc, {
    allPosts: [],
    suggestedPosts: [],
  });

  // Destructuring data

  const { allPosts } = postData;

  // All posts

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

  // Get suggested posts

  const isInFollowing = (postUsername, following) => {
    if (following) {
      const boolValue = following.some(
        ({ username }) => username !== postUsername
      );
      return boolValue;
    }
  };

  // Explanation: If there are no one in following it'll filter only based on current user. Or else, it will take in consider for the follwing as well

  const getSuggestedPosts = (sUser) => {
    if (currentUser.following && currentUser.following.length > 0) {
      const explorePosts = allPosts.filter((post) =>
        post.username === currentUser.username
          ? false
          : isInFollowing(post.username, currentUser.following)
      );
      postDispatch({ type: "SET_SUGGESTED_POSTS", payload: explorePosts });
    } else {
      const explorePosts = allPosts.filter(
        (post) => post.username !== currentUser.username
      );
      postDispatch({ type: "SET_SUGGESTED_POSTS", payload: explorePosts });
    }
  };

  useEffect(() => {
    getSuggestedPosts(suggestedUsers);
  }, [allUsers]);

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
