import { TransactionModel } from "@model/transaction";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../libs/helper/FormatTime";
import { CanceledAction } from "../CanceledAction";
import PaymentCash from "../PaymentCash";

interface ITableItem extends TransactionModel {
  item: TransactionModel;
  onPrint: (item: TransactionModel) => void;
}

export const TableItem: React.FC<ITableItem> = ({
  createdAt,
  item,
  name,
  email,
  paymentMethod,
  id,
  onPrint,
  status,
  // totalAmount,
  // totalPaid,
  // totalReturn,
}) => {
  return (
    <tr>
      {/* <td className="px-4 py-2">
        <p className="text-white">{serialNumber}</p>
      </td> */}
      <td className="px-4 py-2">
        <p className="text-white">{formatDate(createdAt as Date)}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{name}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{email}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{paymentMethod}</p>
      </td>
      <td className="px-4 text-xs text-center text-white py-2">
        {status === "PAID" ? (
          <p className="bg-green-500 px-3 py-1 rounded">{status}</p>
        ) : status === "CANCEL" ? (
          <p className="bg-red-500 px-3 py-1 rounded">{status}</p>
        ) : (
          <p className="bg-gray-500 px-3 py-1 rounded">{status}</p>
        )}
      </td>
      {/* <td className="px-4 py-2">
        <p className="text-white">{formatRupiah(totalAmount || 0)}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{formatRupiah(totalPaid || 0)}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{formatRupiah(totalReturn || 0)}</p>
      </td> */}
      <td className="px-4 py-2">
        <div className="flex items-center justify-center gap-2">
          <Link
            to={`/admin/transaction/${id}`}
            className="hover:opacity-70 text-xs text-white rounded-full px-2 py-1 bg-blue-900 flex justify-center items-center gap-1"
          >
            <FaInfoCircle size={12} /> Detail
          </Link>
          {status == "UNPAID" && paymentMethod === "CASH" && (
            <PaymentCash orderId={id as string} />
          )}
          {status == "UNPAID" && paymentMethod === "CASH" && (
            <CanceledAction id={id as string} />
          )}
          {status !== "UNPAID" && (
            <button
              onClick={() => onPrint(item)}
              className="hover:opacity-70 text-sm text-white px-3 py-1 rounded-md bg-black flex justify-center items-center"
            >
              Print
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
