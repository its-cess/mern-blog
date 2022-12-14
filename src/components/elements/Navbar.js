import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;
  
  return (
    <Fragment>
      <Link to={`${username}`}>Home</Link>
      <Link to={`${username}/new`}>Create New Post</Link>
      <Link onClick={auth.logout} to="/">Logout</Link>
    </Fragment>
  );
};

export default Navbar;
