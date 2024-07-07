import { TransactionModel } from "@model/transaction";
import { formatRupiah } from "../../../../libs/helper";
import { formatDate } from "../../../../libs/helper/FormatTime";

export const TableItem: React.FC<TransactionModel> = ({
  createdAt,

  totalAmount,
  email,
  name,
  paymentMethod,
  totalQuantity,
  status,
}) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <p className="text-white text-nowrap">
          {formatDate(createdAt as Date)}
        </p>
      </td>

      <td className="px-4 py-2">
        <p className="text-white">{name}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{email}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{formatRupiah(totalAmount as number)}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{totalQuantity}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{paymentMethod}</p>
      </td>
      <td className="px-4 text-xs text-center text-white py-2">
        {status === "PAID" ? (
          <p className="bg-green-500 px-3 py-1 rounded">{status}</p>
        ) : (
          <p className="bg-gray-500 px-3 py-1 rounded">{status}</p>
        )}
      </td>
      {/* <td className="px-4 ">
        <div className="flex items-center justify-center gap-1">
          <div className="w-20">
            <Link
              to={`/admin/category/edit/${id}`}
              className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-yellow-500 flex justify-center items-center gap-1"
            >
              <FaEdit /> Edit
            </Link>
          </div>
          <button
            onClick={() => onClickDelete(id as string)}
            className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-red-500 flex justify-center items-center gap-1 w-20"
          >
            <FaTrash /> Hapus
          </button>
        </div>
      </td> */}
    </tr>
  );
};
