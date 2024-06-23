import { useTransaction } from "@hooks/home/useTransactionCreation";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead, TableItem } from "./Table";

const OrderTable = () => {
  const { data: transaction } = useTransaction();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Order</h4>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                "Name",
                "Email",
                "Payment Method",
                "Status",
                "Total Quantity",
                "Total Amount",
                "Actions",
              ]}
            />
            <TableBody>
              <>
                {transaction?.data?.map((item, index) => (
                  <TableItem
                    key={index}
                    onPrint={(id) => alert(`print ${id}`)}
                    name={item.name}
                    email={item.email}
                    paymentMethod={item.paymentMethod}
                    id={item.id}
                    status={item.status}
                    totalAmount={item.totalAmount}
                    totalQuantity={item.totalQuantity}
                  />
                ))}
              </>
            </TableBody>
          </Table>
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
