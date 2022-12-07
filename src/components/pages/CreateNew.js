import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const defaultFormFields = {
  title: "",
  body: ""
}

const CreateNew = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const navigate = useNavigate();
 
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, body } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]:value });
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:4000/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        },
        body: JSON.stringify({
          title: formFields.title,
          body: formFields.body
        })
      })
     await response.json();

     if (response.status === 201) {
      navigate(`../${username}`);
     }

    } catch (err) {
      console.log(err);
    }

    resetFormFields();
  }

  return (
    <div>
    <h1>Create New Post</h1>
    <form onSubmit={onSubmitHandler}>
      <input type="text" name="title" value={title} onChange={onChangeHandler} placeholder="title" />
      <textarea placeholder="body" name="body" value={body} onChange={onChangeHandler}/>
      <button>Post!</button>
    </form>
    </div>
  )
}

export default CreateNew;