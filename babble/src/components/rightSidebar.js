import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import "../App.css";

export const RightSidebar = () => {
  const { authData } = useContext(AuthContext);
  const { allUsers, currentUser } = authData;

  const suggestionUsers = allUsers.filter(({ _id }) => _id !== currentUser._id);

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
        {suggestionUsers.map(
          ({ avatar, firstName, lastName, username, _id }) => {
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
                  <button
                    className="follow-btn"
                    style={{ alignSelf: "center" }}
                  >
                    Follow
                  </button>
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
