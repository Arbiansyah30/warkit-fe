import React, { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import Input from "../Input";

interface NavbarTable {
  action?: "Add" | "Update" | "Data" | "Detail";
  title: string;
  children?: React.ReactNode;
  searchField?: boolean;
  searchKey?: string;
}

const TableAdminLayout: React.FC<NavbarTable> = ({
  action,
  title,
  children,
  searchField,
  searchKey = "search",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ ...queries, [searchKey]: e.target.value });
      if (!e.target.value) {
        const { [searchKey]: _, ...rest } = queries;
        setSearchParams({ ...rest });
      }
    },
    [searchParams, searchKey]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-2xl text-white">{title}</h2>

        <nav>
          {action && (
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
          )}
        </nav>
      </div>
      {searchField ? (
        <div className="flex items-center justify-end">
          <div className="w-64">
            <Input
              value={queries[searchKey] || ""}
              onChange={handleChangeSearch}
              name="search"
              placeholder="Search Transaction"
              style={{ color: "#FFF" }}
            />
          </div>
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
};

export default TableAdminLayout;
