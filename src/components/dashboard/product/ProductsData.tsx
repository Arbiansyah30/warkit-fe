import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductData = () => {
  return (
    <div className="rounded-sm border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
      <div className="py-6  flex flex-wrap items-center justify-between">
        <h4 className="text-xl font-bold text-white">Data Products</h4>
        <Link
          to="/admin/products/add"
          className="text-sm font-medium text-white bg-blue-600 py-2 px-4 rounded-full hover:opacity-90"
        >
          Tambah Data
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4 border-y border-[#eee]">
              <th className="min-w-[220px] px-4 py-4 font-medium text-white">
                Package
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-white">
                Invoice date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 ">
                <h5 className="font-medium text-white">Free Package</h5>
                <p className="text-sm text-white">$0.00</p>
              </td>
              <td className="px-4 py-2">
                <p className="text-white">Jan 13,2023</p>
              </td>
              <td className="px-4 py-2">
                <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium text-white">
                  Paid
                </p>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-3">
                  <button className="hover:opacity-70 text-sm text-white rounded-full px-1 bg-yellow-500 flex justify-center items-center gap-1">
                    <FaEdit /> Edit
                  </button>
                  <button className="hover:opacity-70 text-sm text-white rounded-full px-1 bg-red-500 flex justify-center items-center gap-1">
                    <FaTrash /> Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 ">
                <h5 className="font-medium text-white">Standard Package</h5>
                <p className="text-sm text-white">$59.00</p>
              </td>
              <td className="px-4 py-2">
                <p className="text-white">Jan 13,2023</p>
              </td>
              <td className="px-4 py-2">
                <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium text-white">
                  Paid
                </p>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-3">
                  <button className="hover:opacity-70 text-sm text-white rounded-full px-1 bg-yellow-500 flex justify-center items-center gap-1">
                    <FaEdit /> Edit
                  </button>
                  <button className="hover:opacity-70 text-sm text-white rounded-full px-1 bg-red-500 flex justify-center items-center gap-1">
                    <FaTrash /> Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductData;
