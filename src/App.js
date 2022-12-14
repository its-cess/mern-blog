import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import { UserContext } from "./context/user-context";
import { useProfile } from "./hooks/user-hook"; 

import Auth from "./components/pages/Auth";
import SharedLayout from "./components/elements/SharedLayout";
import Home from "./components/pages/Home";
import CreateNew from "./components/pages/CreateNew";
import UpdateEntry from "./components/pages/UpdateEntry";
import EditProfile from "./components/pages/EditProfile";


const App = () => {
  const { token, login, logout, userId } = useAuth();
  const { username, bio, birthday, fetchUserProfile } = useProfile();
  
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
          login: login,
          logout: logout, 
        }}
      >
     <UserContext.Provider value={{
      fetchUserProfile: fetchUserProfile,
      username: username,
      bio: bio,
      birthday: birthday
     }}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
     </UserContext.Provider>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
