import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const EntryItem = (props) => {
  const auth = useContext(AuthContext);

  const onDeleteHandler = async () => {
    const postId = props.id;

    try {
      await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token 
        }
      })
      alert("post deleted!")
      props.onDelete(props.id)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
    <li id={props.id}>
      <h2>{props.title}</h2>
      <h3>{props.body}</h3>
    </li>
    <button>Edit</button>
    <button onClick={onDeleteHandler}>Delete</button>
    </Fragment>
  )
}

export default EntryItem;