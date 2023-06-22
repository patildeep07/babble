import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { useContext } from "react";
import { AuthContext } from "./context/authProvider";

function App() {
  const { authData } = useContext(AuthContext);
  const { isLoggedIn } = authData;

  return (
    <div className="App">
      {isLoggedIn && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      )}

      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
