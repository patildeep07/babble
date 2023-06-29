import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";

export const Header = () => {
  const { authData, logoutHandler } = useContext(AuthContext);
  const { isLoggedIn } = authData;
  const navigate = useNavigate();
  return (
    <div className="flex-space-between header">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Babble
      </h1>
      <input
        placeholder="Search User"
        style={{
          border: "1px solid #dafffb",
          backgroundColor: "#001c30",
          borderRadius: "20px",
          padding: "0 10px",
          color: "#fefefe",
          width: "300px",
        }}
      />
      {isLoggedIn && (
        <h1 onClick={() => logoutHandler()} style={{ cursor: "pointer" }}>
          Logout
        </h1>
      )}
    </div>
  );
};
