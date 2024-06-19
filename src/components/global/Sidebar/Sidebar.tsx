import useResponsive from "@hooks/useResponsive";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaBox, FaChartBar, FaTags } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface DropdownProps {
  name: string;
  icon: JSX.Element;
  link: string;
  dropdown?: { name: string; link: string }[];
}

const Sidebar: React.FC<{
  hamburger: boolean;
  handleHamburger: () => void;
}> = ({ hamburger, handleHamburger }) => {
  const [selected, setSelected] = useState<string | null>("Products");
  const { isLaptop } = useResponsive();

  const menuItems = [
    {
      name: "Products",
      icon: <FaBox />,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: <FaTags />,
      link: "/admin/categories",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      link: "#",
      dropdown: [
        { name: "Sales Report", link: "#" },
        { name: "Order Report", link: "#" },
      ],
    },
  ];

  const handleMenuClick = (item: DropdownProps) => {
    if (item.dropdown && item.name === selected) {
      return setSelected(null);
    }
    setSelected(item.name);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-[9999] flex min-h-screen w-72 flex-col overflow-y-hidden shadow-lg bg-gray-900 text-gray-200 duration-300 ease-linear lg:static ${
        isLaptop
          ? hamburger
            ? "translate-x-0"
            : "translate-x-[-100%]"
          : "translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <h1 className="text-3xl font-bold">Logo</h1>
        <button
          type="button"
          onClick={() => handleHamburger()}
          className="lg:hidden"
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
                <li key={item.name}>
                  <Link
                    className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-700 ${
                      selected === item.name ? "bg-gray-700" : ""
                    }`}
                    to={item.link}
                    onClick={() => {
                      handleMenuClick(item);
                    }}
                  >
                    {item.icon}
                    {item.name}
                    {item.dropdown && (
                      <BsChevronDown
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform ${
                          selected === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {item.dropdown && selected === item.name && (
                    <div className="translate transform overflow-hidden">
                      <ul className="mb-5 mt-4 flex flex-col gap-2 pl-6">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              className="group relative flex items-center gap-2 rounded-md px-4 font-medium text-gray-400 duration-300 ease-in-out hover:text-white"
                              to={subItem.link}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
