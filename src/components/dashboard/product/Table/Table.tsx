import React, { ReactNode, TableHTMLAttributes } from "react";

interface ITable extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const Table: React.FC<ITable> = ({ children, ...rest }) => {
  return (
    <table className="w-full table-auto" {...rest}>
      {children}
    </table>
  );
};
