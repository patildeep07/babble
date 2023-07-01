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

      case "SET_HOME_POSTS":
        return { ...state, homePosts: action.payload };

      case "SET_BOOKMARK_POSTS":
        return { ...state, bookmarks: action.payload };

      default:
        break;
    }
  };

  // Post useReducer defined here

  const [postData, postDispatch] = useReducer(postReducerFunc, {
    allPosts: [],
    suggestedPosts: [],
    homePosts: [],
    bookmarks: [],
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

  const isInFollowingForSuggested = (postUsername, following) => {
    if (following) {
      const boolValue = following.some(
        ({ username }) => username !== postUsername
      );
      return boolValue;
    }
  };

  // Explanation: If there are no one in following it'll filter only based on current user. Or else, it will take in consider for the follwing as well

  const getSuggestedPosts = () => {
    if (currentUser.following && currentUser.following.length > 0) {
      const explorePosts = allPosts.filter((post) =>
        post.username === currentUser.username
          ? false
          : isInFollowingForSuggested(post.username, currentUser.following)
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
    getSuggestedPosts();
  }, [allUsers]);

  // Get home posts

  const isInFollowingForHome = (postUsername, following) => {
    if (following) {
      const boolValue = following.some(
        ({ username }) => username === postUsername
      );
      return boolValue;
    }
  };

  const getHomePosts = () => {
    if (currentUser.following && currentUser.following.length > 0) {
      const followingsPost = allPosts.reduce(
        (acc, post) =>
          post.username === currentUser.username ||
          isInFollowingForHome(post.username, currentUser.following)
            ? [...acc, post]
            : [...acc],
        []
      );

      postDispatch({ type: "SET_HOME_POSTS", payload: followingsPost });
    } else {
      const homePosts = allPosts.filter(
        (post) => post.username === currentUser.username
      );
      postDispatch({ type: "SET_HOME_POSTS", payload: homePosts });
    }
  };

  useEffect(() => {
    getHomePosts();
  }, [allUsers]);

  // add to Bookmarks function

  const token = localStorage.getItem("encodedToken");

  const addToBookmarks = async (postId) => {
    try {
      const {
        status,
        data: { bookmarks },
      } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        const bookmarksList = allPosts.filter((post) =>
          bookmarks.some(({ _id }) => _id === post._id)
        );
        postDispatch({ type: "SET_BOOKMARK_POSTS", payload: bookmarksList });
        alert("Added to bookmarks");
      }
    } catch (error) {
      alert(error);
    }
  };

  // Remove from bookmarks function

  const removeFromBookmarks = async (postId) => {
    try {
      const {
        status,
        data: { bookmarks },
      } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        const bookmarksList = allPosts.filter((post) =>
          bookmarks.some(({ _id }) => _id === post._id)
        );
        postDispatch({ type: "SET_BOOKMARK_POSTS", payload: bookmarksList });
        alert("Removed from bookmarks");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        addToBookmarks,
        removeFromBookmarks,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
