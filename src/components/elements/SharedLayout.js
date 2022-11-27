import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const SharedLayout = () => {
  return (
    <div>
      Shared
      <Navbar />
      <Outlet />
    </div>
  )
}

export default SharedLayout;