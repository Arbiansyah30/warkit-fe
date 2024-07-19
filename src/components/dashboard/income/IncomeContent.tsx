import { useIncome } from "@hooks/admin/useIncome";
import { IncomeModel } from "@model/income";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { convertQueryParamsToObject } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import DropdownPrint from "../../global/DropdownPrint";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";

export const IncomeContent = () => {
  const { data: incomeResponse, isLoading } = useIncome();

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

  useEffect(() => {
    const date = searchParams.get("date");
    if (date?.includes("undefined")) {
      setSearchParams({});
      return;
    }
  }, [JSON.stringify({ date: searchParams.get("date") })]);

  // console.log(filteredIncome);

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <h4 className="text-xl font-bold text-white">Data Income</h4>
            {/* <DateFilter /> */}
            <div className="mr-5">
              <DatePicker
                onChange={(value) =>
                  setSearchParams({
                    ...queryParams,
                    date: `${value?.getFullYear()}-${
                      (value?.getMonth() as number) + 1
                    }-${value?.getUTCDate()}`,
                  })
                }
              />
            </div>
          </div>
          <div className="mr-5">
            <DropdownPrint dataIncome={incomeResponse?.data as IncomeModel} />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                "Date Time",
                "Total Product Sold",
                "Total Nominal",
                "",
              ]}
            />
            <TableBody>
              <>
                {isLoading ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="flex w-full h-48 justify-center items-center text-white">
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : !incomeResponse?.data?.incomes.length ? (
                  <tr>
                    <td colSpan={4}>
                      <EmptyData title="Income" action={false} />
                    </td>
                  </tr>
                ) : (
                  incomeResponse?.data?.incomes?.map((item, index) => (
                    <TableItem
                      key={index}
                      totalQty={item.transaction?.totalQuantity as number}
                      nominal={item.nominal}
                      createdAt={item.createdAt}
                    />
                  ))
                )}
              </>
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={incomeResponse?.meta?.page as number}
        totalPages={incomeResponse?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};
