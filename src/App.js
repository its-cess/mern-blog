import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import LogIn from "./components/forms/LogIn";
import SignUp from "./components/forms/SignUp";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
