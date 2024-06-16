import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarApp";

const Users = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ScrollRestoration /> */}
    </>
  );
};

export default Users;
