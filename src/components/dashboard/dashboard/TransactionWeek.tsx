import { MetaResponse } from "@core/libs/api/types";
import { TransactionModel } from "@model/transaction";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableHead } from "../../global/Table";
import { TableItem } from "./Table/TableItem";

export const TransactionWeek: React.FC<{
  Transaction: TransactionModel[] | undefined;
  isLoading: boolean;
  meta: MetaResponse;
}> = ({ Transaction, isLoading, meta }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
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
          <Pagination
            currentPage={meta?.page as number}
            totalPages={meta?.totalPages as number}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
};
