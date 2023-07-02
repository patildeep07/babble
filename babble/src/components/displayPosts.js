import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

import notBookmarked from "../images/notBookmarked.png";
import bookmarked from "../images/bookmarked.png";
import liked from "../images/liked.png";
import notLiked from "../images/notLiked.png";
import deleteIcon from "../images/deleteIcon.png";

import { PostContext } from "../context/postProvider";

export const DisplayPosts = ({ post }) => {
  // Usecontext
  const { authData } = useContext(AuthContext);
  const { allUsers, currentUser } = authData;

  const {
    addToBookmarks,
    postData,
    removeFromBookmarks,
    likePost,
    dislikePost,
    deletePost,
  } = useContext(PostContext);
  const { bookmarks } = postData;

  // Destructure data

  const { username, _id, content, likes, createdAt, postImage } = post;

  const { likeCount, likedBy, dislikedBy } = likes;

  // get Time

  const timeObj = new Date(createdAt);
  const time = `${timeObj.getDate()} / ${timeObj.getMonth()} / ${timeObj.getFullYear()}`;

  // Found user

  const foundUser = allUsers.find((user) => user.username === username);

  // isBookmarked

  const isBookmarked = bookmarks.some((post) => post._id === _id);

  // isLiked

  const isLiked = likedBy.some((user) => user._id === currentUser._id);

  return (
    <div
      style={{
        boxSizing: "border-box",
        backgroundColor: "#176B87",
        width: "80%",
        padding: "20px 20px",
        margin: " 20px 0",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "left", width: "100%" }}>
        {/* Post details starts */}
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "space-between",
          }}
        >
          <img alt="user" src={foundUser?.avatar} style={{ height: "50px" }} />

          {/* Column bio */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifySelf: "flex-start",
              flexGrow: "1",
            }}
          >
            {/* First column */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <h3>
                {foundUser?.firstName} {foundUser?.lastName}
              </h3>
              <p style={{ fontWeight: "lighter" }}>{time}</p>
            </div>

            {/* Second column */}
            <p style={{ fontWeight: "lighter" }}>@{username}</p>
          </div>
          {/* Third column */}
          {currentUser.username === username && (
            <h2 style={{ textDecoration: "underline", cursor: "pointer" }}>
              EDIT
            </h2>
          )}
        </div>

        {/* Third row */}
        <p>{content}</p>

        {/* Fourth row */}
        {postImage && <img alt="content" src={postImage} />}

        <hr
          style={{
            margin: "20px 0 ",
            borderTop: "1px dashed lightGray",
            borderBottom: "none",
          }}
        />

        {/* Fifth row */}
        <div
          className="interactive-section"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Like count */}
          <div style={{ display: "flex", gap: "10px" }}>
            {!isLiked && (
              <img
                onClick={() => likePost(_id)}
                alt="Click to like post"
                src={notLiked}
                style={{ height: "25px", cursor: "pointer" }}
              />
            )}

            {isLiked && (
              <img
                onClick={() => dislikePost(_id)}
                alt="Click to dislike post"
                src={liked}
                style={{ height: "25px", cursor: "pointer" }}
              />
            )}

            <p>{likeCount}</p>
          </div>

          {/* Bookmark */}
          <div style={{ display: "flex" }}>
            {!isBookmarked && (
              <img
                onClick={() => addToBookmarks(_id)}
                alt="Click to add bookmark"
                src={notBookmarked}
                style={{ height: "25px", cursor: "pointer" }}
              />
            )}

            {isBookmarked && (
              <img
                onClick={() => removeFromBookmarks(_id)}
                alt="Click to remove bookmark"
                src={bookmarked}
                style={{ height: "25px", cursor: "pointer" }}
              />
            )}
          </div>

          {/* Delete */}
          <div style={{ display: "flex" }}>
            <img
              alt="Delete"
              onClick={() => deletePost(_id)}
              style={{ height: "25px", cursor: "pointer" }}
              src={deleteIcon}
            />
          </div>
        </div>
      </div>

      {/* Post details ends */}
    </div>
  );
};
