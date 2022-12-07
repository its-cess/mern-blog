import { Fragment, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import { UserContext } from "../../context/user-context";

import Profile from "../elements/Profile";
import EntriesList from "../elements/EntriesList";


const Home = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const { currentUser, setCurrentUser } = user;
  const [loadedEntries, setLoadedEntries] = useState([]);
  const localState = localStorage.getItem("userProfile");
  
  const userId = auth.userId;

  useEffect(()=> {
    if(localState !== null) {
      let data = JSON.parse(localStorage.getItem("userProfile"));
      setCurrentUser(data.userProfile);
      console.log(currentUser, "Initial useEffect local storage");
    } else {
      fetchCurrentUser();
      setCurrentUser(currentUser)
    }
  }, [])

 useEffect(() => {
   const fetchUserEntries = async () => {   
    try {
      const response = await fetch(`http://localhost:4000/posts/user/${userId}`, {
        headers: {
          "Authorization": "Bearer " + auth.token
        }
      })
      const responseData = await response.json();
      setLoadedEntries(responseData.posts)
    } catch (err) {}
    
  };
  fetchUserEntries();
 }, [auth.token, userId])

 const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`http://localhost:4000/${userId}`, {
      headers: {
        "Authorization": "Bearer " + auth.token
      }
    })
    const responseData = await response.json();
    localStorage.setItem("userProfile", JSON.stringify({ userProfile: responseData.user }));
    setCurrentUser(responseData.user);
    console.log("Initial API setCurrentUser");
  } catch (err) {
    console.log(err);
  }
}

 const deleteEntryHandler = (deletedEntryId) => {
  setLoadedEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== deletedEntryId))
 }

  return (
    <Fragment>
      <Profile />
      {loadedEntries.length === 0 ? (<div>create first post</div>) : (<EntriesList entries={loadedEntries} onDeleteEntry={deleteEntryHandler}/>)}
    </Fragment>
  );
};

export default Home;
