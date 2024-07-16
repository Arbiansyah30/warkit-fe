import { useAuth } from "@hooks/auth/useAuth";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/global/Sidebar/Sidebar";
import NavbarAdmin from "../../components/global/admin/NavbarAdmin";

const AdminView = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to={"/admin/login"} replace />;
  }

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
      <div
        className={`relative flex flex-col duration-300 overflow-hidden flex-1 max-w-full`}
      >
        <NavbarAdmin handleHamburger={handleHamburger} />
        <main className={`mt-[86px]`}>
          <div
            className={`mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 xl:ml-72`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminView;
