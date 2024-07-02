import { ProductModel } from "@model/product";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { formatRupiah } from "../../../../libs/helper";
import { loadingBarAtom } from "../../../../store/loadingBar";

type onDelete = (id: string) => void;

interface TableItemProps extends ProductModel {
  onClickDelete: onDelete;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const TableItem: React.FC<TableItemProps> = ({
  id,
  onClickDelete,
  category,
  image,
  name,
  price,
  stock,
  isError,
  isPending,
  isSuccess,
}) => {
  const [loading, setLoading] = useAtom(loadingBarAtom);
  const toggle = () =>
    withReactContent(Swal)
      .fire({
        title: `Are you sure want delete ${name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          onClickDelete(id as string);
        }
      });

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    }
    if (isSuccess) {
      setLoading(false);
    }
    if (isError) {
      setLoading(false);
    }
  }, [loading, isPending, isSuccess, isError]);
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
              to={`/admin/product/edit/${id}`}
              className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-yellow-500 flex justify-center items-center gap-1"
            >
              <FaEdit /> Edit
            </Link>
          </div>
          <button
            onClick={toggle}
            className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-red-500 flex justify-center items-center gap-1 w-20"
          >
            <FaTrash /> Hapus
          </button>
        </div>
      </td>
    </tr>
  );
};
