import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const DisplayPosts = ({ post }) => {
  const { authData } = useContext(AuthContext);
  const { allUsers, currentUser } = authData;

  const { username, _id, content, likes, createdAt, postImage } = post;

  const { likeCount, likedBy, dislikedBy } = likes;

  const timeObj = new Date(createdAt);
  const time = `${timeObj.getDate()} / ${timeObj.getMonth()} / ${timeObj.getFullYear()}`;

  const foundUser = allUsers.find((user) => user.username === username);
  // const { firstName, lastName } = foundUser;

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
            <p>V</p>
            <p>{likeCount}</p>
          </div>

          {/* Bookmark */}
          <div style={{ display: "flex" }}>
            <p>V</p>
          </div>

          {/* Share */}
          <div style={{ display: "flex" }}>
            <p>V</p>
          </div>
        </div>
      </div>

      {/* Post details ends */}
    </div>
  );
};
