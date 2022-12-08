import { createContext } from "react";

export const UserContext = createContext({
  username: null,
  bio: null,
  birthday: null,
  fetchUserProfile: () => {}
})