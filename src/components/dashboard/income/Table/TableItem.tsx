import { IncomeItem } from "@model/income";
import { formatDate } from "../../../../libs/helper/FormatTime";

interface ITableItem extends IncomeItem {
  name: string;
}

export const TableItem: React.FC<ITableItem> = ({
  createdAt,
  nominal,
  name,
}) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <p className="text-white">{name}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{nominal}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-white">{formatDate(createdAt)}</p>
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
