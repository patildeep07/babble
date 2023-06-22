import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const Profile = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData);
  return (
    <div>
      <h1>User profile</h1>
    </div>
  );
};
