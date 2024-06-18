import React from "react";
import { Link } from "react-router-dom";

const NavbarTableAdmin : React.FC<{ detail: string }> = ({ detail }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-bold text-2xl text-white">Products</h2>

      <nav>
        <ol className="flex text-base items-center gap-2">
          <li>
            <Link className="font-medium text-secondary" to="/admin/products">
              Products /
            </Link>
          </li>
          <li className="font-medium text-blue-500">{detail} Product</li>
        </ol>
      </nav>
    </div>
  );
};

export default NavbarTableAdmin;
