import React from "react";
import { Link } from "react-router-dom";

interface NavbarTable {
  action: "Add" | "Update" | "Data";
  title: string;
}

const NavbarTableAdmin: React.FC<NavbarTable> = ({ action, title }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-bold text-2xl text-white">{title}</h2>

      <nav>
        <ol className="flex text-base items-center gap-2">
          <li>
            <Link
              className="font-medium text-secondary"
              to={`/admin/${title.toLowerCase()}`}
            >
              {title} /
            </Link>
          </li>
          <li className="font-medium text-blue-500">
            {action} {title}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default NavbarTableAdmin;
