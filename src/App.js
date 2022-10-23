import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Auth from "./components/pages/Auth";
import Home from "./components/pages/Home";
import CreateNew from "./components/pages/CreateNew";

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
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="new" element={<CreateNew />} />
        </Routes>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
