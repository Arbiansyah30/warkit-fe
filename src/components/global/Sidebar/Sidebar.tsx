import { useProfile } from "@hooks/home/useProfile";
import useResponsive from "@hooks/useResponsive";
import React, { useEffect, useState } from "react";
import { FaBox, FaChartBar, FaTags } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { useLocation } from "react-router-dom";
import LOGO from "../../../assets/images/LOGO.png";
import ItemSidebar from "./Item";

const Sidebar: React.FC<{
  hamburger: boolean;
  handleHamburger: (value: boolean) => void;
}> = ({ hamburger, handleHamburger }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<string | null>("Products");
  const { isLaptop } = useResponsive();
  const { role } = useProfile();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/admin/dashboard",
    },
    {
      name: "Product",
      icon: <FaBox />,
      link: "/admin/product",
    },
    {
      name: "Category",
      icon: <FaTags />,
      link: "/admin/category",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      dropdown:
        role.toLowerCase() === "owner"
          ? [
              { name: "Transaction Report", link: "/admin/transaction" },
              { name: "Income Report", link: "/admin/income" },
            ]
          : [{ name: "Transaction Report", link: "/admin/transaction" }],
    },
  ];

  useEffect(() => {
    menuItems.forEach((item) => {
      if (location.pathname.includes(item.link as string)) {
        setIsActive(item.name);
      }
    });
    return handleHamburger(false);
  }, [location]);

  const handleDropdown = (value: string) => {
    if (value === isActive) return setIsActive(null);
    setIsActive(value);
  };

  return (
    <aside
      className={`max-lg:fixed flex-0 left-0 top-0 z-[9999] flex min-h-screen shrink-0 w-72 flex-col overflow-y-hidden shadow-lg bg-gray-900 text-gray-200 duration-300 ease-linear static ${
        isLaptop
          ? hamburger
            ? "translate-x-0"
            : "translate-x-[-100%]"
          : "translate-x-0"
      }`}
    >
      <div className="flex items-center justify-center max-lg:justify-between gap-2 px-6 py-5 lg:py-6">
        <img src={LOGO} width={60} />
        <button
          type="button"
          onClick={() => handleHamburger(true)}
          className="hidden max-lg:flex"
        >
          <FaArrowLeftLong />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-3 px-4 py-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-gray-500">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1">
              {menuItems.map((item) => (
                <ItemSidebar
                  key={item.name}
                  name={item.name}
                  link={item.link || ""}
                  dropdown={item.dropdown}
                  isActive={isActive || ""}
                  handleDropdown={handleDropdown}
                >
                  {item.icon} {item.name}
                </ItemSidebar>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
