import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Reducer function
  const reducerFunc = (state, action) => {
    console.log({ state, action });
  };

  // Setting up useReducer

  const [authData, authDispatch] = useReducer(reducerFunc, {
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider
      value={{
        authData,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
