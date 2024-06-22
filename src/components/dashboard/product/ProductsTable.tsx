import { useProduct, useProductDelete } from "@hooks/home/useProduct";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject, formatRupiah } from "../../../libs/helper";
import Pagination from "../../global/Pagination";

const ProductsTable = () => {
  const { data: products, isLoading } = useProduct({ perPage: 10 });
  const mutation = useProductDelete();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const handleDelete: (id: string) => void = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6 flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Products</h4>
          <Link
            to="/admin/product/add"
            className="text-sm font-medium text-white bg-blue-600 py-2 px-4 rounded-full hover:opacity-90"
          >
            Add Product
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border-y border-[#eee]">
                <th className="px-4 py-4 font-medium text-white">Product</th>
                <th className="px-4 py-4 font-medium text-white">Price</th>
                <th className="px-4 py-4 font-medium text-white">Stock</th>
                <th className="px-4 py-4 font-medium text-white">Category</th>
                <th className="px-4 py-4 font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-[100px] max-h-[100px] object-cover"
                    />
                    <div>
                      <h5 className="font-medium text-white">{item.name}</h5>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">
                      {formatRupiah(item.price || 0)}
                    </p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.stock}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.category?.name}</p>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center flex-col gap-1">
                      <Link
                        to={`/admin/product/edit/${item.id}`}
                        className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-yellow-500 flex justify-center items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id as string)}
                        className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-red-500 flex justify-center items-center gap-1"
                      >
                        <FaTrash /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={products?.meta?.page as number}
        totalPages={products?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default ProductsTable;
