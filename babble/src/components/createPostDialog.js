import { useContext, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { PostContext } from "../context/postProvider";

import { v4 as uuid } from "uuid";
import { formatDate } from "../backend/utils/authUtils";

export const CreatePostDialog = () => {
  // useContext
  const { authData } = useContext(AuthContext);
  const { currentUser } = authData;

  const { postDispatch, createPost } = useContext(PostContext);

  //   Data
  const [postDetails, setPostDetails] = useState({
    _id: uuid(),
    content: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: currentUser.username,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  });

  //   Save Handler

  const saveHandler = (postDetails) => {
    // console.log({ postDetails });

    createPost(postDetails);
    // Close dialog
    postDispatch({ type: "HIDE_DIALOG" });
  };

  return (
    <div
      className="create-post-box"
      style={{
        position: "fixed",
        top: "40%",
        left: "50%",
        marginTop: "-100px",
        marginLeft: "-250px",
        height: "50vh",
        width: "500px",
        background: "#001c30",

        border: "2px solid white",
        borderRadius: "10px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h2>Create a post! </h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "10px 0",
          flexWrap: "wrap",
        }}
      >
        <img alt="user" src={currentUser?.avatar} style={{ height: "50px" }} />
        <input
          onChange={(e) =>
            setPostDetails({ ...postDetails, content: e.target.value })
          }
          style={{
            padding: "5px",
            height: "100px",
            flexGrow: "1",
            width: "300px",
            border: "1px solid white",
            borderRadius: "10px",
            background: "#001c30",
            color: "white",
          }}
          placeholder="What's in your head?"
        />
      </div>
      <hr
        style={{
          width: "80%",
          borderTop: "1px dashed lightgray",
          borderBottom: "none",
        }}
      />

      {/* Save starts here */}

      <div
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>IMG</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <h3
            onClick={() => postDispatch({ type: "HIDE_DIALOG" })}
            style={{ color: "red", cursor: "pointer" }}
          >
            Cancel
          </h3>
          <h3
            onClick={() => saveHandler(postDetails)}
            style={{ color: "lightGreen", cursor: "pointer" }}
          >
            Save
          </h3>
        </div>
      </div>

      {/* Save ends here */}
    </div>
  );
};
