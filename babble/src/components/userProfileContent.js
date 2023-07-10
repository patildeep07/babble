import { useContext, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { PostContext } from "../context/postProvider";
import { useNavigate } from "react-router-dom";
import { DisplayPosts } from "./displayPosts";

// Avatars
import avatarImage1 from "../backend/db/avatars/Avatar-1.png";
import avatarImage2 from "../backend/db/avatars/Avatar-2.png";
import avatarImage3 from "../backend/db/avatars/Avatar-3.png";
import avatarImage4 from "../backend/db/avatars/Avatar-4.png";
import avatarImage5 from "../backend/db/avatars/Avatar-5.png";

export const UserProfileContent = () => {
  // UseContexts

  const { authData, updateUserDetails } = useContext(AuthContext);
  const { currentUser } = authData;

  const { postData, postDispatch } = useContext(PostContext);
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
    editUserProfile,
  } = currentUser;

  // Converting date

  const dateObj = new Date(createdAt);
  const date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;

  // User posts

  const userPosts = allPosts?.filter(
    ({ username }) => username === currentUser.username
  );

  // Change user details

  const [userDetails, setUserDetails] = useState(currentUser);

  const updateButtonHandler = () => {
    updateUserDetails({ ...userDetails, editUserProfile: false });
  };

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

          {!editUserProfile && (
            <div>
              {bio && <p>{bio}</p>}
              {url && (
                <p>
                  Find me at{" "}
                  <a
                    style={{ color: "white" }}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {url}
                  </a>{" "}
                </p>
              )}
            </div>
          )}

          {editUserProfile && (
            <div>
              <textarea
                placeholder="Enter your bio here"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, bio: e.target.value })
                }
                style={{ height: "20px", width: "80%" }}
                defaultValue={bio}
              ></textarea>

              <p>
                Find me at{" "}
                <textarea
                  placeholder="Enter your website here"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, url: e.target.value })
                  }
                  style={{ height: "20px", width: "80%" }}
                  defaultValue={url}
                ></textarea>
              </p>

              <select
                onChange={(e) =>
                  setUserDetails({ ...userDetails, avatar: e.target.value })
                }
                defaultValue={avatar}
              >
                <option defaultChecked>Choose an avatar</option>
                <option value={avatarImage1}>Avatar 1</option>
                <option value={avatarImage2}>Avatar 2</option>
                <option value={avatarImage3}>Avatar 3</option>
                <option value={avatarImage4}>Avatar 4</option>
                <option value={avatarImage5}>Avatar 5</option>
              </select>
            </div>
          )}

          {!editUserProfile && (
            <button
              onClick={() =>
                updateUserDetails({ ...userDetails, editUserProfile: true })
              }
              style={{ margin: "10px 0 0 0", fontSize: "16px" }}
            >
              Edit profile
            </button>
          )}

          {editUserProfile && (
            <button
              onClick={updateButtonHandler}
              style={{ margin: "10px 0 0 0", fontSize: "16px" }}
            >
              Update
            </button>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
              margin: "10px 0 0 0",
            }}
          >
            <p>
              <span style={{ fontWeight: "bold" }}>{userPosts.length}</span>{" "}
              posts
            </p>
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
            onClick={() => postDispatch({ type: "SHOW_DIALOG" })}
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
