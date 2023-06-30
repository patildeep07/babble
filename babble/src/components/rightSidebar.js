import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import "../App.css";

export const RightSidebar = () => {
  const { authData, followUserHandler } = useContext(AuthContext);
  const { allUsers, currentUser, suggestedUsers } = authData;

  return (
    <div
      style={{
        textAlign: "left",
        borderLeft: "1px solid #dafffb",
        paddingLeft: "30px",
      }}
    >
      <h3>Suggestions for you</h3>
      <div className="users-div-sidebar">
        {suggestedUsers.map(
          ({ avatar, firstName, lastName, username, _id, followers }) => {
            return (
              <div key={_id}>
                <div
                  className="flex-row-spaceBetween"
                  style={{ margin: "10px 10px 10px 0" }}
                >
                  {/* Row content */}
                  <img
                    alt="userPicture"
                    src={avatar}
                    style={{ width: "50px" }}
                  />
                  <div style={{ flexGrow: "1" }}>
                    <p>
                      {firstName} {lastName}
                    </p>
                    <p>@{username}</p>
                  </div>

                  {followers.some(
                    (currFollower) => currFollower._id === currentUser._id
                  ) && <button disabled>Followed</button>}

                  {!followers.some(
                    (currFollower) => currFollower._id === currentUser._id
                  ) && (
                    <button
                      onClick={() => followUserHandler(_id)}
                      className="follow-btn"
                      style={{ alignSelf: "center" }}
                    >
                      Follow
                    </button>
                  )}
                </div>

                <hr />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
