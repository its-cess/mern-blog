import { Fragment } from "react";

import LogIn from "../forms/LogIn";
import SignUp from "../forms/SignUp";

const Auth = () => {
  return (
    <Fragment>
      <LogIn />
      <SignUp />
    </Fragment>
  );
};

export default Auth;
