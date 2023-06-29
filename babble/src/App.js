import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { useContext } from "react";
import { AuthContext } from "./context/authProvider";
import { Explore } from "./pages/explore";
import { Bookmarks } from "./pages/bookmarks";

function App() {
  const { authData } = useContext(AuthContext);
  const { isLoggedIn } = authData;

  return (
    <div className="App ">
      {isLoggedIn && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Profile />} />
          <Route path="/signup" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      )}

      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/explore" element={<Login />} />
          <Route path="/bookmarks" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
