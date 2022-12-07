import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

const defaultEntry = {
  title: "",
  body: ""
}

const UpdateEntry = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loadedEntry, setLoadedEntry] = useState(defaultEntry);
  const entryId = useParams().entryId;
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoadedEntry({ ...loadedEntry, [name]:value });
  }

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${entryId}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + auth.token
        }
      })
     const responseData = await response.json();
     setLoadedEntry(responseData.post);
      } catch(err) {}
    };
    fetchEntry();
  }, [auth.token, entryId])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/posts/${entryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        },
        body: JSON.stringify({
          title: loadedEntry.title,
          body: loadedEntry.body
        })
      })
      await response.json();

      if (response.status === 200) {
        alert("Entry updated!")
        navigate(`/${currentUser.username}`);
      }
    } catch(err) {}
  };



  return (
    <div>
    <h1>Create New Post</h1>
    <form onSubmit={onSubmitHandler}>
      <input type="text" name="title" value={loadedEntry.title} onChange={onChangeHandler} placeholder="title" />
      <textarea placeholder="body" name="body" value={loadedEntry.body} onChange={onChangeHandler}/>
      <button type="submit">Update Post</button>
    </form>
    </div>
  )
};

export default UpdateEntry;