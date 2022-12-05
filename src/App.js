import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import { UserProvider } from "./context/user-context";

import Auth from "./components/pages/Auth";
import SharedLayout from "./components/elements/SharedLayout";
import Home from "./components/pages/Home";
import CreateNew from "./components/pages/CreateNew";
import UpdateEntry from "./components/pages/UpdateEntry";
import EditProfile from "./components/pages/EditProfile";

const App = () => {
  const { token, login, logout, userId, username } = useAuth();

  let routes;
  
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
            <Route index path={`/:username`} element={<Home />} />
            <Route path={`/:username/new`} element={<CreateNew />} />
            <Route path={`/:username/edit/:entryId`} element={<UpdateEntry />} />
            <Route path={`/:username/profile`} element={<EditProfile />}/>
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
          username: username,
          login: login,
          logout: logout, 
        }}
      >
      <UserProvider>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </UserProvider>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
