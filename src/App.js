import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Auth from "./components/pages/Auth";
import Home from "./components/pages/Home";

const App = () => {
  const { token, login, logout, userId, username } = useAuth();

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          username: username,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
