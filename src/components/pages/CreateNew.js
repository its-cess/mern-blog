import { useState } from "react";

const defaultFormFields = {
  title: "",
  body: ""
}

const CreateNew = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, body } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]:value });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert("form submitted!")
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