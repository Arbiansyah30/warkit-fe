import { useProfile } from "@hooks/home/useProfile";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

const NavbarAdmin: React.FC<{
  handleHamburger: () => void;
}> = ({ handleHamburger }) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profile = useProfile();
  return (
    <header className="sticky bg-gray-900 top-0 z-[999] flex shadow-lg">
      <div className="flex flex-grow items-center justify-between px-4 py-6 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 hover:text-secondary text-white">
          {/* Hamburger Toggle BTN */}
          <div
            className="relative h-5 w-5 cursor-pointer lg:hidden flex justify-center items-center"
            onClick={() => handleHamburger()}
          >
            <RxHamburgerMenu className="fill-current" />
          </div>
          {/* Hamburger Toggle BTN */}
        </div>

        <div className="flex items-center gap-4 2xsm:gap-7">
          {/* <ul className="flex items-center gap-2 2xsm:gap-4"> */}
          {/* Notification Menu Area */}
          {/* <li className="relative">
              <a
                className="relative flex items-center text-lg gap-1 justify-center rounded-full border-stroke hover:text-secondary text-white"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <FaBell className="fill-current" />{" "}
                <span className="text-sm">{"1"}</span>
              </a> */}

          {/* Dropdown Start */}
          {/* {dropdownOpen && (
                <div className="absolute right-0 mt-2 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default w-60 sm:w-80">
                  <div className="px-4 py-3">
                    <h5 className="text-sm font-medium">Notification</h5>
                  </div>
                  <ul className="flex h-auto flex-col overflow-y-auto">
                    <li className="p-2">
                      <p className="text-base">
                        Pesanan Atas Nama {"Kocak Bange"}?
                      </p>
                      <div className="flex justify-end gap-1 text-sm flex-wrap">
                        <button className="bg-green-600 hover:opacity-90 px-3 py-1 rounded-md text-white">
                          Confirm
                        </button>
                        <button className="bg-red-600 hover:opacity-90 px-3 py-1 rounded-md text-white">
                          Reject
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              )} */}
          {/* Dropdown End */}
          {/* </li> */}
          {/* Notification Menu Area */}
          {/* </ul> */}

          {/* User Area */}
          <div className="relative">
            <p
              className="flex text-white hover:text-secondary text-lg items-center gap-4 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
            >
              <div className="text-center flex items-center gap-4">
                <p className="block text-xs font-medium">
                  {profile?.name || "Anonymous"}
                </p>
                <p>|</p>
                <p className="block text-xs font-medium">
                  {profile?.role || "Admin"}
                </p>
              </div>

              <IoMdArrowDropdown
                className={`hidden duration-300 fill-current sm:block ${
                  profileDropdownOpen ? "rotate-180" : ""
                }`}
                width="12"
                height="8"
              />
            </p>

            {/* Dropdown Start */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-4 flex w-62 flex-col rounded-sm border border-stroke bg-white shadow-default">
                <ul className="flex flex-col gap-5 border-b border-stroke px-3 py-2">
                  <li>
                    <p className="flex items-center gap-3 text-red-600 text-xs font-medium duration-300 ease-in-out hover:opacity-70 cursor-pointer">
                      <RiLogoutBoxLine
                        className="fill-current"
                        width="22"
                        height="22"
                      />
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
            {/* Dropdown End */}
          </div>
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
