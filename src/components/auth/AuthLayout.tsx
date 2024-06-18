import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col w-full text-center px-5 py-10 rounded-3xl bg-[#dddddd] gap-5">
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      {children}
    </div>
  );
};

export default AuthLayout;
