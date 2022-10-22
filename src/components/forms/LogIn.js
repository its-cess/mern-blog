import { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const defaultFormFields = {
  username: "",
  password: ""
};

const LogIn = () => {
  const auth = useContext(AuthContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: formFields.username,
          password: formFields.password
        })
      });
      auth.login(
        responseData.userId,
        responseData.username,
        responseData.token
      );
    } catch (err) {}

    resetFormFields();
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChangeHandler}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />

        <button>Sign In</button>
      </form>
      <Link to="/signup">Need an account? Create one!</Link>
    </Fragment>
  );
};

export default LogIn;
