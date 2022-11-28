import { Fragment, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth-context";

import EntriesList from "../elements/EntriesList";


const Home = () => {
  const auth = useContext(AuthContext);
  const [loadedEntries, setLoadedEntries] = useState([]);

  const userId = auth.userId;
  
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
    } catch (err) {
      console.log(err);
    }
  };
  fetchUserEntries();
 }, [auth.token, userId])

 const deleteEntryHandler = (deletedEntryId) => {
  setLoadedEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== deletedEntryId))
 }

  return (
    <Fragment>
      <h2>User Home Page</h2>
      {loadedEntries && <EntriesList entries={loadedEntries} onDeleteEntry={deleteEntryHandler}/>}  
    </Fragment>
  );
};

export default Home;
