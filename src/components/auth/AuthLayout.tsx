import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/images/LOGO.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  auth: "Login" | "Register";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, auth }) => {
  return (
    <div className="flex flex-col w-full px-5 py-10 rounded-md bg-gray-900 text-white gap-10">
      <div className="gap-3 flex flex-col text-center">
        <div className="flex items-center justify-center">
          <img src={LOGO} alt="logo" width={70} />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-semibold">{auth.toUpperCase()}</h4>
          {children}
          <div className="flex items-center gap-2 text-xs">
            <p className="text-sm">Don't have an account?</p>
            <Link
              to={`/admin/${auth === "Login" ? "register" : "login"}`}
              className="text-sm text-blue-400"
            >
              {auth === "Login" ? "Register" : "Login"}
            </Link>
          </div>
        </div>
      </div>
      {/* </AuthLayout> */}
    </div>
  );
};

export default AuthLayout;
