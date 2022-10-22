import { Fragment, useContext } from "react";

//import { AuthContext } from "../../context/auth-context";

import Navbar from "../UIElements/Navbar";

const Home = () => {
  //const auth = useContext(AuthContext);
  return (
    <Fragment>
      <Navbar />
      <h2>User Home Page</h2>
    </Fragment>
  );
};

export default Home;
