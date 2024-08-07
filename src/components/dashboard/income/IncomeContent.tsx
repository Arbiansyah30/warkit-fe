import { useIncome, useIncomeWithoutPage } from "@hooks/admin/useIncome";
import { IncomeModel } from "@model/income";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { convertQueryParamsToObject, formatRupiah } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import DropdownPrint from "../../global/DropdownPrint";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";

export const IncomeContent = () => {
  const { data: incomeResponse, isLoading } = useIncome();
  const { data: incomeWithoutPage } = useIncomeWithoutPage();

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

  // console.log(filteredIncome);

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <h4 className="text-xl font-bold text-white">Data Income</h4>
            {/* <DateFilter /> */}
            <div className="mr-5 flex items-center gap-5">
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
            </div>
          </div>
          <div className="mr-5">
            <DropdownPrint
              dataIncome={incomeWithoutPage?.data as IncomeModel}
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                "Date Time",
                "Name",
                "Email",
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
                  <>
                    {incomeResponse?.data?.incomes?.map((item, index) => (
                      <TableItem
                        key={index}
                        totalQty={item.transaction?.totalQuantity as number}
                        nominal={item.nominal}
                        createdAt={item.createdAt}
                        name={item.transaction?.name as string}
                        email={item.transaction?.email as string}
                      />
                    ))}
                    <tr>
                      <td colSpan={5}>
                        <div className="w-full border-t border-solid border-white py-2 flex items-center justify-end">
                          <div className="flex items-center gap-3">
                            <p className="text-white">Total Income : </p>
                            <p className="text-white">
                              {formatRupiah(incomeResponse.data.totalIncome)}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
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
