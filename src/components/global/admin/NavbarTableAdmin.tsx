import React from "react";
import { Link } from "react-router-dom";

const NavbarTableAdmin : React.FC<{ detail: string, data: string, link: string }> = ({ detail, data, link }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-bold text-2xl capitalize text-white">{data}</h2>

      <nav>
        <ol className="flex text-base items-center gap-2">
          <li>
            <Link className="font-medium capitalize text-secondary" to={link}>
              {data} /
            </Link>
          </li>
          <li className="font-medium capitalize text-blue-500">{detail} {data}</li>
        </ol>
      </nav>
    </div>
  );
};

export default NavbarTableAdmin;
