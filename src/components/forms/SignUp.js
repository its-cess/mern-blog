import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const defaultFormFields = {
  username: "",
  email: "",
  password: ""
};

const SignUp = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, email, password } = formFields;

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
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: formFields.username,
          email: formFields.email,
          password: formFields.password
        })
      });
      const responseData = await response.json();

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

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />

        <button>Create Account</button>
      </form>
    </Fragment>
  );
};

export default SignUp;
