import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./authProvider";
import axios, { all } from "axios";

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

      case "SET_HOME_POSTS":
        return { ...state, homePosts: action.payload };

      case "SET_BOOKMARK_POSTS":
        return { ...state, bookmarks: action.payload };

      case "SET_EXPLORE_POSTS":
        return { ...state, explorePosts: action.payload };

      default:
        break;
    }
  };

  // Post useReducer defined here

  const [postData, postDispatch] = useReducer(postReducerFunc, {
    allPosts: [],
    homePosts: [],
    bookmarks: [],
    explorePosts: [],
  });

  // Destructuring data

  const { allPosts, bookmarks } = postData;

  // All posts

  const updateAllPosts = (givenPosts) => {
    postDispatch({ type: "SET_ALL_POSTS", payload: [...givenPosts] });
  };

  const getAllPosts = async () => {
    try {
      const { status, data } = await axios.get("/api/posts");
      if (status === 200) {
        updateAllPosts(data.posts);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
  }, [allUsers, allPosts]);

  // Explore posts

  const getExplorePosts = () => {
    const otherPosts = allPosts.filter(
      ({ username }) => username !== currentUser.username
    );
    postDispatch({ type: "SET_EXPLORE_POSTS", payload: otherPosts });
  };

  useEffect(() => {
    getExplorePosts();
  }, [allPosts, currentUser]);

  // update Bookmarks List

  const updateBookmarksList = (postList, bookmarkList) => {
    const newList = postList.filter((post) =>
      bookmarkList.some(({ _id }) => _id === post._id)
    );
    postDispatch({ type: "SET_BOOKMARK_POSTS", payload: newList });
  };

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
        updateBookmarksList(allPosts, bookmarks);

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
        updateBookmarksList(allPosts, bookmarks);

        alert("Removed from bookmarks");
      }
    } catch (error) {
      alert(error);
    }
  };

  // Like post function

  const likePost = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 201) {
        updateAllPosts(posts);
        updateBookmarksList(posts, bookmarks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Dislike a post
  const dislikePost = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 201) {
        updateAllPosts(posts);
        updateBookmarksList(posts, bookmarks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post functions ends here

  return (
    <PostContext.Provider
      value={{
        postData,
        addToBookmarks,
        removeFromBookmarks,
        likePost,
        dislikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
