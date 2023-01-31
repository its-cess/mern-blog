import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

import "./navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;

  return (
    <Fragment>
      <div className="nav-container">
        <button>
          <Link to={`${username}`}>Home</Link>
        </button>
        <button>
          <Link to={`${username}/new`}>Create New Post</Link>
        </button>
        <button>
          <Link onClick={auth.logout} to="/">
            Logout
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

export default Navbar;
