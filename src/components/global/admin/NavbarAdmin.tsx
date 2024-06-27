import { useProfile } from "@hooks/home/useProfile";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { loadingBarAtom } from "../../../store/loadingBar";

const NavbarAdmin: React.FC<{
  handleHamburger: () => void;
}> = ({ handleHamburger }) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profile = useProfile();
  const [loadingBar, setLoadingBar] = useAtom(loadingBarAtom);

  function logout() {
    const token = localStorage.getItem("token") || "";
    if (token) {
      const navigate = useNavigate();
      localStorage.removeItem("token");
      navigate("/admin/login");
      alert("Logout success");
    }
  }
  return (
    <>
      <header className="fixed bg-gray-900 top-0 left-0 right-0 z-[999] flex shadow-lg">
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
            {/* User Area */}
            <div className="relative">
              <div
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
              </div>

              {/* Dropdown Start */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-4 flex w-62 flex-col rounded-sm border border-stroke bg-white shadow-default">
                  <ul className="flex flex-col gap-5 border-b border-stroke px-3 py-2">
                    <li>
                      <p
                        onClick={logout}
                        className="flex items-center gap-3 text-red-600 text-xs font-medium duration-300 ease-in-out hover:opacity-70 cursor-pointer"
                      >
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
        <LoadingBar
          containerClassName="!absolute !top-[100%]"
          shadowStyle={{ boxShadow: "none" }}
          color="#fff"
          progress={loadingBar ? 20 : 100}
          onLoaderFinished={() => setLoadingBar(false)}
        />
      </header>
    </>
  );
};

export default NavbarAdmin;
