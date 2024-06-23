import { TransactionModel } from "@model/transaction";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ITableItem extends TransactionModel {
  onPrint: (id: string) => void;
}

export const TableItem: React.FC<ITableItem> = ({
  name,
  email,
  paymentMethod,
  id,
  onPrint,
  status,
  totalAmount,
  totalQuantity,
}) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <p className="text-white">{name}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{email}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{paymentMethod}</p>
      </td>
      <td className="px-4 text-center text-white py-2">
        {status === "PAID" ? (
          <p className="bg-green-500 px-3 py-1 rounded">{status}</p>
        ) : (
          <p className="bg-gray-500 px-3 py-1 rounded">{status}</p>
        )}
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{totalQuantity}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{totalAmount}</p>
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/transaction/detail/${id}`}
            className="hover:opacity-70 text-xs text-white rounded-full px-2 py-1 bg-blue-900 flex justify-center items-center gap-1"
          >
            <FaInfoCircle size={12} /> Detail
          </Link>
          <button
            onClick={() => onPrint(id as string)}
            className="hover:opacity-70 text-sm text-white px-3 py-2 rounded-md bg-black flex justify-center items-center gap-1"
          >
            Print
          </button>
        </div>
      </td>
    </tr>
  );
};
