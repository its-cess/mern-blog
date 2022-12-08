import { useState, useCallback, useContext } from "react";

import { AuthContext } from "../context/auth-context";

export const useProfile = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState(false);
  const [bio, setBio] = useState(false);
  const [birthday, setBirthday] = useState(null);
  
  const fetchUserProfile = useCallback(async (uid) => {
      try {
        const response = await fetch(`http://localhost:4000/${uid}`, {
          headers: {
            "Authorization": "Bearer " + auth.token
          }
        })
        const responseData = await response.json();
        localStorage.setItem("userProfile", JSON.stringify({ 
          username: responseData.user.username, 
          bio: responseData.user.bio,
          birthday: responseData.user.birthday
          })
        );
        setUsername(responseData.user.username);
        setBio(responseData.user.bio);
        setBirthday(responseData.user.birthday);
      } catch (err) {
        console.log(err);
      }
  }, [])

  return { username, bio, birthday, fetchUserProfile };
}