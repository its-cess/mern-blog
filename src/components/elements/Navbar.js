import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Header</h2>
      <button onClick={auth.logout}>Logout</button>
      <button onClick={() => navigate("../new")}>Create New Post</button>
    </div>
  );
};

export default Navbar;
