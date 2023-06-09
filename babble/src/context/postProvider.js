import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./authProvider";
import axios, { all } from "axios";
import { formatDate } from "../backend/utils/authUtils";

// toast
import { toast } from "react-toastify";

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

      case "SHOW_DIALOG":
        return { ...state, showCreatePostDialog: true };

      case "HIDE_DIALOG":
        return { ...state, showCreatePostDialog: false };

      case "SET_SORT_BY":
        return { ...state, sortBy: action.payload };

      case "TRIGGER_SORT":
        return { ...state, triggerSort: !state.triggerSort };

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
    showCreatePostDialog: false,
    sortBy: "",
    triggerSort: true,
  });

  const token = localStorage.getItem("encodedToken");

  // Destructuring data

  const { allPosts, bookmarks, sortBy } = postData;

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

  // Edit posts

  const editPostsHandler = async (givenPost) => {
    try {
      const {
        status,
        data: { posts },
      } = await axios.post(
        `/api/posts/edit/${givenPost._id}`,
        { postData: givenPost },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 201) {
        updateAllPosts(posts);
      }
    } catch (error) {
      toast.error(error);
    }
  };

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

  // const token = localStorage.getItem("encodedToken");

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

        toast.success("Added to bookmarks");
      }
    } catch (error) {
      toast.error(error);
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

        toast.success("Removed from bookmarks");
      }
    } catch (error) {
      toast.error(error);
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
        toast.success("Post liked");
        updateAllPosts(posts);
        updateBookmarksList(posts, bookmarks);
        postDispatch({ type: "TRIGGER_SORT" });
      }
    } catch (error) {
      toast.error(error);
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
        toast.success("Post disliked");
        updateAllPosts(posts);
        updateBookmarksList(posts, bookmarks);
        postDispatch({ type: "TRIGGER_SORT" });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Create a new post

  const createPost = async (postDetails) => {
    try {
      const {
        status,
        data: { posts },
      } = await axios.post(
        "/api/posts",
        {
          postData: postDetails,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 201) {
        toast.success("Post created");
        updateAllPosts(posts);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Delete post

  const deletePost = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await axios.delete(`/api/posts/${postId}`, {
        headers: {
          authorization: token,
        },
      });

      if (status === 201) {
        toast.success("Post deleted");
        updateAllPosts(posts);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Sorting function

  const setSortingOrder = (givenPosts = allPosts) => {
    if (sortBy === "Popularity") {
      const sortList = givenPosts.sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
      updateAllPosts(sortList);
    }

    if (sortBy === "Latest") {
      const newData = getExtraInfo(givenPosts);
      const data = newData.sort(
        (a, b) => a.timeSincePosted - b.timeSincePosted
      );
      updateAllPosts(data);
    }
  };

  useEffect(() => {
    setSortingOrder();
  }, [sortBy, postData.triggerSort]);

  // Adding time since posted property

  const timeDiff = (df2, df1) => {
    var diff = (df2.getTime() - df1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  const getExtraInfo = (posts) => {
    const currentTime = new Date(formatDate());
    const newData = posts.map((post) => {
      const postTime = new Date(post.createdAt);
      const timeInterval = timeDiff(currentTime, postTime);
      return { ...post, timeSincePosted: timeInterval };
    });
    return newData;
  };

  // Post functions ends here

  return (
    <PostContext.Provider
      value={{
        postData,
        postDispatch,
        addToBookmarks,
        removeFromBookmarks,
        likePost,
        dislikePost,
        createPost,
        deletePost,
        editPostsHandler,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
