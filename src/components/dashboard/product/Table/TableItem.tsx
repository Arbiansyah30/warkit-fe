import { ProductModel } from "@model/product";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatRupiah } from "../../../../libs/helper";

type onDelete = (id: string) => void;

interface TableItemProps extends ProductModel {
  onClickDelete: onDelete;
}

export const TableItem: React.FC<TableItemProps> = ({
  id,
  onClickDelete,
  category,
  image,
  name,
  price,
  stock,
}) => {
  return (
    <tr>
      <td className="px-4 py-2 flex items-center space-x-3">
        <img
          src={image}
          alt={name}
          className="max-w-[100px] max-h-[100px] h-16 w-24 object-cover rounded-md"
        />
      </td>
      <td className="px-4 ">
        <p className="text-white ">{name}</p>
      </td>
      <td className="px-4 ">
        <p className="text-white ">{formatRupiah(price || 0)}</p>
      </td>
      <td className="px-4 ">
        <p className="text-white ">{stock}</p>
      </td>
      <td className="px-4 ">
        <p className="text-white ">{category?.name}</p>
      </td>
      <td className="px-4 ">
        <div className="flex items-center justify-center gap-1">
          <div className="w-20">
            <Link
              to={`/admin/products/edit/${id}`}
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
