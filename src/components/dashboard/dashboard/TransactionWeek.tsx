import { useTransactionWeek } from "@hooks/home/useTransactionCreation";
import EmptyData from "../../global/EmptyData";
import { Table, TableHead } from "../../global/Table";
import { TableItem } from "./Table/TableItem";

export const TransactionWeek = () => {
  const { data: Transaction, isLoading } = useTransactionWeek();

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <h4 className="text-xl font-bold text-white">Transaction Week</h4>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                "Date Time",
                "Name",
                "Email",
                "Amount",
                "Quantity",
                "Payment Method",
                "Status",
                "",
              ]}
            />
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex w-full h-48 justify-center items-center text-white">
                    Loading...
                  </div>
                </td>
              </tr>
            ) : !Transaction?.data?.length ? (
              <tr>
                <td colSpan={7}>
                  <EmptyData title="Transaction" action={false} />
                </td>
              </tr>
            ) : (
              Transaction?.data?.map((item, index) => (
                <TableItem key={index} {...item} />
              ))
            )}
          </Table>
        </div>
      </div>
    </>
  );
};
