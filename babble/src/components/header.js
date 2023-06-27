import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-space-between header">
      <h1>Babble</h1>
      <input placeholder="Search User" />
      <h1 onClick={() => navigate("/profile")}>Profile</h1>
    </div>
  );
};
