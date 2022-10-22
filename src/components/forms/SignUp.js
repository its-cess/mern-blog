import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const defaultFormFields = {
  username: "",
  email: "",
  password: ""
};

const SignUp = () => {
  const auth = useContext(AuthContext);
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
      const responseData = await fetch("http://localhost:4000/signup", {
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
      auth.login(
        responseData.userId,
        responseData.username,
        responseData.token
      );
    } catch (err) {}

    resetFormFields();
  };

  return (
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
  );
};

export default SignUp;
