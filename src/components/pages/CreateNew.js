import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

import "./createNew.css";

const defaultFormFields = {
  title: "",
  body: ""
};

const CreateNew = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, body } = formFields;

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
      const response = await fetch("http://localhost:4000/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        },
        body: JSON.stringify({
          title: formFields.title,
          body: formFields.body
        })
      });
      await response.json();

      if (response.status === 201) {
        navigate(`../${username}`);
      }
    } catch (err) {
      console.log(err);
    }
    resetFormFields();
  };

  return (
    <div className="post-container">
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Create New Post</div>
        </div>
        <div className="window-body">
          <form onSubmit={onSubmitHandler}>
            <div className="field-row-stacked">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChangeHandler}
              />
            </div>
            <div className="field-row-stacked">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                value={body}
                onChange={onChangeHandler}
                rows="25"
              />
            </div>
            <button>Post!</button>
          </form>
        </div>
      </div>

      {/* <h1>Create New Post</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="field-row-stacked">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeHandler}
          />
        </div>
        <div className="field-row-stacked">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            value={body}
            onChange={onChangeHandler}
            rows="12"
          />
        </div>
        <button>Post!</button>
      </form> */}
    </div>
  );
};

export default CreateNew;
