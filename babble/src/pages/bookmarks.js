import { useContext } from "react";
import { DisplayPosts } from "../components/displayPosts";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { LeftSidebar } from "../components/leftSidebar";
import { RightSidebar } from "../components/rightSidebar";
import { PostContext } from "../context/postProvider";

export const Bookmarks = () => {
  // usecontext
  const { postData } = useContext(PostContext);
  const { bookmarks } = postData;

  return (
    <div>
      {/* Header */}
      <Header className="top" />

      <div className="layout-25-50-25">
        {/* Left side bar */}
        <LeftSidebar className="left-aside" />

        {/* Middle Content */}
        {/* Display posts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          {bookmarks.map((item) => {
            return <DisplayPosts key={item._id} post={item} />;
          })}
        </div>

        {/* Right side bar */}
        <RightSidebar className="right-aside" />
      </div>

      <hr />

      {/* Footer */}
      <Footer className="bottom" />
    </div>
  );
};
