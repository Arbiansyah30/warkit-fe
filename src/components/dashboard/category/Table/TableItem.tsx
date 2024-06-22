import { CategoryModel } from "@model/category";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type onDelete = (id: string) => void;

interface TableItemProps extends CategoryModel {
  onClickDelete: onDelete;
}

export const TableItem: React.FC<TableItemProps> = ({
  id,
  name,
  onClickDelete,
}) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <p className="text-white">{name}</p>
      </td>
      <td className="px-4 ">
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
      </td>
    </tr>
  );
};
