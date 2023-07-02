import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import { CreatePostDialog } from "./createPostDialog";
import { PostContext } from "../context/postProvider";

export const LeftSidebar = () => {
  // useContext
  const { postData, postDispatch } = useContext(PostContext);
  const { showCreatePostDialog } = postData;

  const navigate = useNavigate();

  const styleCursor = { cursor: "pointer" };

  return (
    <div
      style={{
        textAlign: "left",
        borderRight: "1px solid #dafffb",
        paddingLeft: "30px",
      }}
    >
      <h1 onClick={() => navigate("/")} style={styleCursor}>
        Home
      </h1>
      <h1 onClick={() => navigate("/explore")} style={styleCursor}>
        Explore
      </h1>
      <h1 onClick={() => navigate("/bookmarks")} style={styleCursor}>
        Bookmarks
      </h1>
      <h1 onClick={() => navigate("/profile")} style={styleCursor}>
        Profile
      </h1>
      <h1
        style={styleCursor}
        onClick={() => postDispatch({ type: "SHOW_DIALOG" })}
      >
        Post
      </h1>

      {/* Create post dialog */}

      {showCreatePostDialog && <CreatePostDialog />}
    </div>
  );
};
