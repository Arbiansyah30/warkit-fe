import { FaEdit } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import Pagination from "../../global/Pagination";
import { useTransaction } from "@hooks/home/useTransactionCreation";

const OrderTable = () => {
  const { data: transaction } = useTransaction({ perPage: 10 });

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Order</h4>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border-y border-[#eee]">
                <th className="px-4 py-4 font-medium text-white">Name</th>
                <th className="px-4 py-4 font-medium text-white">Email</th>
                <th className="px-4 py-4 font-medium text-white">
                  Payment Method
                </th>
                <th className="px-4 py-4 font-medium text-white">Status</th>
                <th className="px-4 py-4 font-medium text-white">
                  Total Quantity
                </th>
                <th className="px-4 py-4 font-medium text-white">
                  Total Amount
                </th>
                <th className="px-4 py-4 font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.data?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.name}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.email}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.paymentMethod}</p>
                  </td>
                  <td className="px-4 text-center text-white py-2">
                    {item.status === "PAID" ? (
                      <p className="bg-green-500 px-3 py-1 rounded">
                        {item.status}
                      </p>
                    ) : (
                      <p className="bg-gray-500 px-3 py-1 rounded">
                        {item.status}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.totalQuantity}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-white">{item.totalAmount}</p>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/transaction/detail/${item.id}`}
                        className="hover:opacity-70 text-sm text-white rounded-full px-2 bg-blue-900 flex justify-center items-center gap-1"
                      >
                        <FaEdit /> Detail
                      </Link>
                      <button className="hover:opacity-70 text-sm text-white px-3 py-2 rounded-md bg-black flex justify-center items-center gap-1">
                        Print
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
        currentPage={transaction?.meta?.page as number}
        totalPages={transaction?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default OrderTable;
