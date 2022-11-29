import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const Profile = () => {
  const auth = useContext(AuthContext);
  const username = auth.username;

  return (
    <Fragment>
      <h1>Profile Section</h1>
      <h2>Username: {auth.username}</h2>
      <h4>About me:</h4>
      <h4>Birthday:</h4>
      <h4>Member Since:</h4>
      {/* also check if the loggedin person is the profiles owner -MERN project*/}
      {auth.isLoggedIn && <Link to={`/home/${username}/profile`}>Edit Profile</Link>}
    </Fragment>
  )
};

export default Profile;