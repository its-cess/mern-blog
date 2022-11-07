import { Fragment, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth-context";

import Navbar from "../UIElements/Navbar";


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
      console.log(responseData.posts);
      setLoadedEntries(responseData.posts)
      
    } catch (err) {
      console.log(err);
    }
  };
  fetchUserEntries();
 }, [auth.token, userId])

  return (
    <Fragment>
      <Navbar />
      <h2>User Home Page</h2>
      <div>
        <ul>
          {loadedEntries.map((place) => (
            <li key={place.id}>{place.title}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Home;
