import { useTransaction } from "@hooks/home/useTransactionCreation";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";
// import { handlePrint } from "../../global/ThermalPrint";

const OrderTable = () => {
  const { data: transaction, isLoading } = useTransaction();

  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setLoadingBar(isLoading);
  }, [isLoading]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Transaction</h4>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                // "Serial Number",
                "Name",
                "Email",
                "Payment Method",
                "Status",
                // "Total Amount",
                // "Total Paid",
                // "Total Return",
                "Actions",
              ]}
            />
            <TableBody>
              <>
                {isLoading ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex w-full h-48 justify-center items-center text-white">
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : !transaction?.data?.length ? (
                  <tr>
                    <td colSpan={5}>
                      <EmptyData title="Transaction" action={false} />
                    </td>
                  </tr>
                ) : (
                  transaction?.data?.map((item, index) => (
                    <TableItem
                      item={item}
                      key={index}
                      serialNumber={item.serialNumber}
                      // onPrint={(item) => handlePrint(item)}
                      onPrint={(item) => alert("print" + item)}
                      name={item.name}
                      email={item.email}
                      paymentMethod={item.paymentMethod}
                      id={item.id}
                      status={item.status}
                      // totalAmount={item.totalAmount}
                      // totalPaid={item.totalPaid}
                      // totalReturn={item.totalReturn}
                    />
                  ))
                )}
              </>
            </TableBody>
          </Table>
        </div>
      </div>
      {transaction?.data?.length && (
        <Pagination
          currentPage={transaction?.meta?.page as number}
          totalPages={transaction?.meta?.totalPages as number}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};

export default OrderTable;
