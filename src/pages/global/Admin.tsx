import { useState } from "react";
import NavbarAdmin from "../../components/global/admin/NavbarAdmin";
import Sidebar from "../../components/global/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminView = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  const handleHamburger = (value: boolean = true) => {    
    if (value) {
      setHamburger(!hamburger);
    } else {
      setHamburger(value);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar hamburger={hamburger} handleHamburger={handleHamburger} />
      <div className="relative flex flex-col duration-300 flex-1 max-w-full">
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
