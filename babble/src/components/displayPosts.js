import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const DisplayPosts = ({ post }) => {
  const { authData } = useContext(AuthContext);
  const { allUsers } = authData;

  const { username, _id, content, likes, createdAt, postImage } = post;

  const { likeCount, likedBy, dislikedBy } = likes;

  const timeObj = new Date(createdAt);
  const time = `${timeObj.getDate()} / ${timeObj.getMonth()} / ${timeObj.getFullYear()}`;

  const foundUser = allUsers.find((user) => user.username === username);
  const { firstName, lastName } = foundUser;

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
      <div style={{ textAlign: "left" }}>
        {/* Post details starts */}
        <div style={{ display: "flex", gap: "5px" }}>
          <img alt="user" src={foundUser.avatar} style={{ height: "50px" }} />

          {/* Column bio */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* First row */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <h3>
                {firstName} {lastName}
              </h3>
              <p style={{ fontWeight: "lighter" }}>{time}</p>
            </div>
            {/* Second row */}
            <p style={{ fontWeight: "lighter" }}>@{username}</p>
          </div>
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
