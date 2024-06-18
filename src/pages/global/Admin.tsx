import { useState } from "react";
import NavbarAdmin from "../../components/global/admin/NavbarAdmin";
import Sidebar from "../../components/global/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminView = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar hamburger={hamburger} handleHamburger={handleHamburger} />
      <div className="relative flex flex-1 flex-col duration-300 w-full">
        <NavbarAdmin handleHamburger={handleHamburger} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminView;
