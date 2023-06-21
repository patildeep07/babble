import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Reducer function
  const reducerFunc = (state, action) => {
    console.log({ state, action });
  };

  // Setting up useReducer

  const [authData, authDispatch] = useReducer(reducerFunc, {});

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
