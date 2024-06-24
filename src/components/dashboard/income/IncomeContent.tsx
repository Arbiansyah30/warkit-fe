import { useIncome } from "@hooks/admin/useIncome";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";
import { useAtom } from "jotai";
import { loadingBarAtom } from "../../../store/loadingBar";
import { useEffect, useState } from "react";
import { IncomeItem } from "@model/income";
import DateFilter from "../../global/DateFilter";

export const IncomeContent = () => {
  const { data: incomeResponse, isLoading } = useIncome();
  const [filteredIncome, setFilteredIncome] = useState<IncomeItem[]>([]);

  
  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setFilteredIncome(incomeResponse?.data?.incomes || []);
    setLoadingBar(isLoading);
  }, [isLoading]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const handleFilter = (startDate: Date, endDate: Date) => {
    if (!incomeResponse?.data?.incomes) return;
    const income: IncomeItem[] = incomeResponse?.data?.incomes;
    const filtered = income.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
    });
    setFilteredIncome(filtered);
};

  console.log(filteredIncome);

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-col items-start justify-between">
          <h4 className="text-xl font-bold text-white">Data Income</h4>
          <DateFilter onFilter={handleFilter} />
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead HeadList={["Date Time", "Total Product Sold", "Total Nominal", ""]} />
            <TableBody>
              <>
                {filteredIncome.map((item, index) => (
                  <TableItem
                    key={index}
                    totalQty={item.transaction?.totalQuantity as number}
                    nominal={item.nominal}
                    createdAt={item.createdAt}
                  />
                ))}
              </>
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <Pagination
        currentPage={income?.meta?.page as number}
        totalPages={income?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      /> */}
    </>
  );
};
