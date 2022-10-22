import { Fragment, useState, useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const defaultFormFields = {
  username: "",
  password: ""
};

const LogIn = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: formFields.username,
          password: formFields.password
        })
      });
      const responseData = await response.json();
      console.log(responseData);
      auth.login(responseData.userId, responseData.token);
      if (responseData.token) {
        navigate("home");
      }
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
      <Outlet />
    </Fragment>
  );
};

export default LogIn;
