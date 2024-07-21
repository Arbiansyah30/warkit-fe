import {
  usePrintPayment,
  useTransaction,
} from "@hooks/home/useTransactionCreation";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "rsuite";
import { convertQueryParamsToObject } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";
// import { handlePrint } from "../../global/ThermalPrint";

const OrderTable = () => {
  const mutation = usePrintPayment();
  const { data: transaction, isLoading } = useTransaction();

  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setLoadingBar(isLoading || mutation.isPending);
  }, [isLoading, mutation.isPending]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const hanldePrint = async (id: string) => {
    await mutation.mutateAsync({
      data: {
        id,
      },
    });
  };

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (from?.includes("undefined")) {
      const { from, ...rest } = queryParams;
      setSearchParams({ ...rest });
      return;
    }
    if (to?.includes("undefined")) {
      const { to, ...rest } = queryParams;
      setSearchParams({ ...rest });
      return;
    }

    if (!from) {
      const { to, from, ...rest } = queryParams;
      setSearchParams({ ...rest });
      return;
    }
  }, [
    JSON.stringify({
      from: searchParams.get("from"),
      to: searchParams.get("to"),
    }),
  ]);

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap justify-between">
          <h4 className="text-xl font-bold text-white">Data Transaction</h4>

          <div className="flex flex-col gap-5 items-end">
            <div className="flex items-center gap-5">
              <DatePicker
                name="from"
                onChange={(value) =>
                  setSearchParams({
                    ...queryParams,
                    from: `${value?.getFullYear()}-${
                      (value?.getMonth() as number) + 1
                    }-${value?.getUTCDate()}`,
                  })
                }
              />
              {searchParams.get("from") ? (
                <>
                  <p className="text-white">TO</p>
                  <DatePicker
                    name="to"
                    onChange={(value) =>
                      setSearchParams({
                        ...queryParams,
                        to: `${value?.getFullYear()}-${
                          (value?.getMonth() as number) + 1
                        }-${value?.getUTCDate()}`,
                      })
                    }
                  />
                </>
              ) : null}
              {/* <InputGroup style={{ width: 500 }}>
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  block
                  appearance="subtle"
                  style={{ width: 230 }}
                />
                <InputGroup.Addon>to</InputGroup.Addon>
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  block
                  appearance="subtle"
                  style={{ width: 230 }}
                />
              </InputGroup> */}
            </div>
            <div className="flex items-center gap-3">
              {searchParams.get("status") && (
                <p
                  className="text-white cursor-pointer"
                  onClick={() => setSearchParams({})}
                >
                  RESET
                </p>
              )}
              <div className="flex items-center gap-3">
                <p
                  className={`${
                    searchParams.get("status")?.toLowerCase() === "paid"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } text-white px-3 py-1 rounded cursor-pointer`}
                  onClick={() =>
                    setSearchParams({ ...queryParams, status: "paid" })
                  }
                >
                  PAID
                </p>
                <p
                  className={`${
                    searchParams.get("status")?.toLowerCase() === "unpaid"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } text-white px-3 py-1 rounded cursor-pointer`}
                  onClick={() =>
                    setSearchParams({ ...queryParams, status: "unpaid" })
                  }
                >
                  UNPAID
                </p>
                <p
                  className={`${
                    searchParams.get("status")?.toLowerCase() === "cancel"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } text-white px-3 py-1 rounded cursor-pointer`}
                  onClick={() =>
                    setSearchParams({ ...queryParams, status: "cancel" })
                  }
                >
                  CANCEL
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                // "Serial Number",
                "Date Time",
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
                  <>
                    {transaction?.data?.map((item, index) => (
                      <TableItem
                        item={item}
                        key={index}
                        createdAt={item.createdAt}
                        serialNumber={item.serialNumber}
                        // onPrint={(item) => handlePrint(item)}
                        onPrint={(item) => hanldePrint(item.id as string)}
                        name={item.name}
                        email={item.email}
                        paymentMethod={item.paymentMethod}
                        id={item.id}
                        status={item.status}
                        // totalAmount={item.totalAmount}
                        // totalPaid={item.totalPaid}
                        // totalReturn={item.totalReturn}
                      />
                    ))}
                  </>
                )}
              </>
            </TableBody>
          </Table>
        </div>
      </div>
      {transaction?.data?.length ? (
        <Pagination
          currentPage={transaction?.meta?.page as number}
          totalPages={transaction?.meta?.totalPages as number}
          onPageChange={handleChangePage}
        />
      ) : null}
    </>
  );
};

export default OrderTable;
