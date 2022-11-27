import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Auth from "./components/pages/Auth";
import SharedLayout from "./components/elements/SharedLayout";
import Home from "./components/pages/Home";
import CreateNew from "./components/pages/CreateNew";
import UpdateEntry from "./components/pages/UpdateEntry";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="new" element={<CreateNew />} />
            <Route path="posts/:entryId" element={<UpdateEntry />} />
        </Route>
      </Routes>
    )
  } else {
    routes = (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
    )
  }

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
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
