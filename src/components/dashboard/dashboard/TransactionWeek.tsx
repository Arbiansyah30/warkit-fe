import EmptyData from "../../global/EmptyData";
import { Table, TableHead } from "../../global/Table";
import { TableItem } from "./Table/TableItem";
import { TransactionModel } from "@model/transaction";

export const TransactionWeek: React.FC<{
  Transaction: TransactionModel[] | undefined;
  isLoading: boolean;
}> = ({ Transaction, isLoading }) => {
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
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <div className="flex w-full h-48 justify-center items-center text-white">
                      Loading...
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : !Transaction?.length ? (
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <EmptyData title="Transaction" action={false} />
                  </td>
                </tr>
              </tbody>
            ) : (
              Transaction?.map((item, index) => (
                <TableItem key={index} {...item} />
              ))
            )}
          </Table>
        </div>
      </div>
    </>
  );
};
