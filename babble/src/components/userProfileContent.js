import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const UserProfileContent = () => {
  const { authData } = useContext(AuthContext);
  const { currentUser } = authData;

  // Destructuring current user
  const {
    avatar,
    firstName,
    lastName,
    username,
    createdAt,
    bio,
    url,
    followers,
    following,
  } = currentUser;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        margin: "20px 0",
      }}
    >
      <div
        className="profile-card"
        style={{
          backgroundColor: "#176B87",
          width: "80%",
          padding: "20px 0",
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <img alt="userImage" src={avatar} style={{ width: "100px" }} />
        <div style={{ textAlign: "left" }}>
          <h3>
            {firstName} {lastName}
          </h3>
          <p>@{username}</p>

          {bio && <p>{bio}</p>}
          {url && <p>Find me at {url} </p>}

          <button style={{ margin: "10px 0 0 0", fontSize: "16px" }}>
            Edit profile
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
              margin: "10px 0 0 0",
            }}
          >
            <p>posts</p>
            <p>
              <span style={{ fontWeight: "bold" }}>{followers.length}</span>{" "}
              followers
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>{following.length}</span>{" "}
              following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
