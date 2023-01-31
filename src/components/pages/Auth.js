import { Fragment } from "react";

import LogIn from "../forms/LogIn";
import SignUp from "../forms/SignUp";

import "./auth.css";

const Auth = () => {
  return (
    <Fragment>
      <div className="auth-container">
        <LogIn />
        <SignUp />
      </div>
    </Fragment>
  );
};

export default Auth;
