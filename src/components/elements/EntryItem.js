import { Fragment } from "react";

const EntryItem = (props) => {
  return (
    <Fragment>
    <li>
      <h2>{props.title}</h2>
      <h3>{props.body}</h3>
    </li>
    <button>Edit</button>
    <button>Delete</button>
    </Fragment>
  )
}

export default EntryItem;