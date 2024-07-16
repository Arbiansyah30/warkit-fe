import { useProfile } from "@hooks/home/useProfile";
import { CategoryModel } from "@model/category";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loadingCircle } from "../../../../store/loadingBar";

type onDelete = (id: string) => void;

interface TableItemProps extends CategoryModel {
  onClickDelete: onDelete;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const TableItem: React.FC<TableItemProps> = ({
  id,
  name,
  onClickDelete,
  isPending,
  isSuccess,
  isError,
}) => {
  const [loading, setLoading] = useAtom(loadingCircle);
  const { role } = useProfile();

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
    <>
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
            {role.toLowerCase() === "owner" && (
              <button
                onClick={toggle}
                className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-red-500 flex justify-center items-center gap-1 w-20"
              >
                <FaTrash /> Hapus
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
