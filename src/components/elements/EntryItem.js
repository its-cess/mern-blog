import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const EntryItem = (props) => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const username = user.username;

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
    <Link to={`${username}/edit/${props.id}`}>Edit</Link>
    <button onClick={onDeleteHandler}>Delete</button>
    </Fragment>
  )
}

export default EntryItem;