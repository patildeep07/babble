import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import "./profile.css";
import { Header } from "../components/header";
import { LeftSidebar } from "../components/leftSidebar";
import { RightSidebar } from "../components/rightSidebar";
import { Footer } from "../components/footer";
import { UserProfileContent } from "../components/userProfileContent";

export const Profile = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData);

  return (
    <div>
      {/* Header */}
      <Header className="top" />

      <div className="layout-25-50-25">
        {/* Left side bar */}
        <LeftSidebar className="left-aside" />

        {/* Middle Content */}
        <UserProfileContent className="middle-content" />

        {/* Right side bar */}
        <RightSidebar className="right-aside" />
      </div>

      <hr />

      {/* Footer */}
      <Footer className="bottom" />
    </div>
  );
};
