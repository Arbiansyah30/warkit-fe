import { Outlet } from "react-router-dom";

const AuthView = () => {
  return (
    <div className="flex items-center w-full h-screen">
      <div className="w-[50vw]"></div>
      <Outlet />
    </div>
  );
};

export default AuthView;
