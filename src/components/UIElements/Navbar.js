import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <div>
      <h2>Header</h2>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

export default Navbar;
