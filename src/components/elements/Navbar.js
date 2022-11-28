import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
 

  return (
    <Fragment>
      <button onClick={auth.logout}>Logout</button>
      <Link to="new">Create New Post</Link>
    </Fragment>
  );
};

export default Navbar;
