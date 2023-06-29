import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { PostContext } from "../context/postProvider";
import { useNavigate } from "react-router-dom";
import { DisplayPosts } from "./displayPosts";

export const UserProfileContent = () => {
  // UseContexts

  const { authData } = useContext(AuthContext);
  const { currentUser } = authData;

  const { postData } = useContext(PostContext);
  const { allPosts } = postData;

  // Random init

  const navigate = useNavigate();

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

  // Converting date

  const dateObj = new Date(createdAt);
  const date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;

  // User posts

  const userPosts = allPosts?.filter(
    ({ username }) => username === currentUser.username
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      {/* Profile card section starts */}
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
          <p>Joined on: {date}</p>

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
      {/* Profile card section ends */}

      {/* User posts section start */}

      {/* When 0 posts exists */}
      {userPosts.length === 0 && (
        <h1>
          Create your first post.{" "}
          <span
            onClick={() => navigate("/create-post")}
            style={{ textDecoration: "underline" }}
          >
            Here
          </span>
        </h1>
      )}

      {/* Display posts */}

      {userPosts.map((item) => {
        return <DisplayPosts key={item._id} post={item} />;
      })}

      {/* User posts section ends */}
    </div>
  );
};
