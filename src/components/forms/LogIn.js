import { Fragment, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const defaultFormFields = {
  username: "",
  password: ""
};

const LogIn = () => {
  const auth = useContext(AuthContext);
  //const navigate = useNavigate();

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formFields.username,
          password: formFields.password
        })
      });
      const responseData = await response.json();

      auth.login(
        responseData.userId,
        responseData.token
      );
      if (responseData.token) {
       alert("Logged in!")
      }
    } catch (err) {
      console.log(err);
    }

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
    </Fragment>
  );
};

export default LogIn;
