import { useContext } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { LeftSidebar } from "../components/leftSidebar";
import { RightSidebar } from "../components/rightSidebar";
import { PostContext } from "../context/postProvider";
import { DisplayPosts } from "../components/displayPosts";

export const Explore = () => {
  // useContexts

  const { postData } = useContext(PostContext);
  const { suggestedPosts } = postData;

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
          {suggestedPosts &&
            suggestedPosts.map((item) => {
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
