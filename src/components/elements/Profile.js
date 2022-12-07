import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <h1>Profile Section</h1>
      <h2>Username: {!currentUser ? "" : currentUser.username}</h2>
      <h4>About Me: {!currentUser ? "" : currentUser.bio}</h4>
      {/* <h4>Birthday: {!currentUser ? "" : currentUser.birthday}</h4> */}
      {/* also check if the loggedin person is the profiles owner -MERN project*/}
      {/* {auth.isLoggedIn && <Link to={`/${username}/profile`}>Edit Profile</Link>} */}
    </Fragment>
  )
};

export default Profile;