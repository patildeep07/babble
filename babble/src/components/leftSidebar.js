import { useNavigate } from "react-router-dom";

export const LeftSidebar = () => {
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
      <h1 style={styleCursor}>Post</h1>
    </div>
  );
};
