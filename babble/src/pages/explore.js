import { useContext } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { LeftSidebar } from "../components/leftSidebar";
import { RightSidebar } from "../components/rightSidebar";
import { AuthContext } from "../context/authProvider";
import { PostContext } from "../context/postProvider";
import { DisplayPosts } from "../components/displayPosts";

export const Explore = () => {
  // useContexts
  const { authData } = useContext(AuthContext);
  const { currentUser, suggestedUsers } = authData;

  const { postData } = useContext(PostContext);
  const { allPosts, suggestedPosts } = postData;

  // Explore posts
  console.log(suggestedPosts);

  const explorePosts = allPosts?.filter((post) =>
    suggestedUsers.some(({ username }) => username === post.username)
  );

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
