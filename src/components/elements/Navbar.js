import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  
  
  return (
    <Fragment>
      <Link to={`${currentUser.username}`}>Home</Link>
      <Link to={`${currentUser.username}/new`}>Create New Post</Link>
      <Link onClick={auth.logout} to="/">Logout</Link>
    </Fragment>
  );
};

export default Navbar;
