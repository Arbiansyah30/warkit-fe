import { Outlet } from "react-router-dom";
import Section from "../../container/Section";

const AuthView = () => {
  return (
    <div className="flex items-center w-full h-screen">
      <Section className="max-w-sm w-full mx-auto box-content">
        <Outlet />
      </Section>
    </div>
  );
};

export default AuthView;
