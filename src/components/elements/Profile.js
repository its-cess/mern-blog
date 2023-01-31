import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;

  return (
    <Fragment>
      <h1>Profile Section</h1>
      <h2>Username: {!user ? "" : username}</h2>
      <h4>About Me: {!user ? "" : user.bio}</h4>
      <h4>
        Birthday:{" "}
        {!user.birthday ? (
          ""
        ) : (
          <Fragment>
            {user.birthday.month} {user.birthday.day}
          </Fragment>
        )}
      </h4>
      {/* also check if the loggedin person is the profiles owner -MERN project*/}
      {auth.isLoggedIn && (
        <button>
          <Link to={`/${username}/profile`}>Edit Profile</Link>
        </button>
      )}
    </Fragment>
  );
};

export default Profile;
