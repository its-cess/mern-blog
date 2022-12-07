import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const { currentUser } = user;
  
  return (
    <Fragment>
      <Link to={`${user.username}`}>Home</Link>
      <Link to={`${user.username}/new`}>Create New Post</Link>
      <Link onClick={auth.logout} to="/">Logout</Link>
    </Fragment>
  );
};

export default Navbar;
