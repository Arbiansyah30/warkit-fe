import {
  useTransaction,
  useTransactionMonth,
  useTransactionToday,
  useTransactionWeek,
} from "@hooks/home/useTransactionCreation";
import { TransactionModel } from "@model/transaction";
import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "rsuite";
import {
  TransactionDay,
  TransactionWeek,
} from "../../components/dashboard/dashboard";
import { Card } from "../../components/dashboard/dashboard/Card";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";
import { convertQueryParamsToObject, formatRupiah } from "../../libs/helper";
import chartOption from "../../libs/helper/Chart";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const [open, setOpen] = useState<boolean>(false);
  const { data: Transaction, isLoading } = useTransaction();
  const {
    data: dataTransactionDay,
    isLoading: isLoadingDay,
  } = useTransactionToday();
  const {
    data: dataTransactionWeek,
    isLoading: isLoadingWeek,
  } = useTransactionWeek();
  const { data: january, isLoading: isLoadingJan } = useTransactionMonth("1");
  const { data: february, isLoading: isLoadingFeb } = useTransactionMonth("2");
  const { data: march, isLoading: isLoadingMar } = useTransactionMonth("3");
  const { data: april, isLoading: isLoadingApr } = useTransactionMonth("4");
  const { data: mayy, isLoading: isLoadingMay } = useTransactionMonth("5");
  const { data: june, isLoading: isLoadingJun } = useTransactionMonth("6");
  const { data: july, isLoading: isLoadingJul } = useTransactionMonth("7");
  const { data: august, isLoading: isLoadingAug } = useTransactionMonth("8");
  const { data: september, isLoading: isLoadingSep } = useTransactionMonth("9");
  const { data: october, isLoading: isLoadingOct } = useTransactionMonth("10");
  const { data: november, isLoading: isLoadingNov } = useTransactionMonth("11");
  const { data: december, isLoading: isLoadingDec } = useTransactionMonth("12");

  const isLoadingAllMonth = () => {
    return (
      isLoadingJan ||
      isLoadingFeb ||
      isLoadingMar ||
      isLoadingApr ||
      isLoadingMay ||
      isLoadingJun ||
      isLoadingJul ||
      isLoadingAug ||
      isLoadingSep ||
      isLoadingOct ||
      isLoadingNov ||
      isLoadingDec
    );
  };

  const calculateTotalAmount = (
    transactions: TransactionModel[] | undefined
  ) => {
    if (
      searchParams.get("year") !== new Date().getFullYear().toString() &&
      searchParams.get("year")
    ) {
      return 0;
    }
    return (
      transactions?.reduce(
        (total, transaction) => total + (transaction.totalAmount || 0),
        0
      ) || 0
    );
  };

  const calculateTotalByPaymentMethod = (
    transactions: TransactionModel[] | undefined,
    method: string
  ) => {
    return (
      transactions?.reduce(
        (total, transaction) =>
          transaction.paymentMethod === method
            ? total + (transaction.totalAmount || 0)
            : total,
        0
      ) || 0
    );
  };

  const calculateTotalByStatus = (
    transactions: TransactionModel[] | undefined,
    status: string
  ) => {
    return (
      transactions?.reduce(
        (total, transaction) =>
          transaction.status === status
            ? total + (transaction.totalAmount || 0)
            : total,
        0
      ) || 0
    );
  };

  const totalTransactionDayAmount = calculateTotalAmount(
    dataTransactionDay?.data
  );
  const totalTransactionWeekAmount = calculateTotalAmount(
    dataTransactionWeek?.data
  );
  const totalTransactionQrisAmount = calculateTotalByPaymentMethod(
    Transaction?.data,
    "QRIS"
  );
  const totalTransactionCashAmount = calculateTotalByPaymentMethod(
    Transaction?.data,
    "CASH"
  );
  const totalTransactionPaidAmount = calculateTotalByStatus(
    Transaction?.data,
    "PAID"
  );
  const totalTransactionUnpaidAmount = calculateTotalByStatus(
    Transaction?.data,
    "UNPAID"
  );
  const totalTransactionCancelAmount = calculateTotalByStatus(
    Transaction?.data,
    "CANCEL"
  );

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    if (!isLoadingAllMonth()) {
      const jan = calculateTotalAmount(january?.data);
      const feb = calculateTotalAmount(february?.data);
      const mar = calculateTotalAmount(march?.data);
      const apr = calculateTotalAmount(april?.data);
      const may = calculateTotalAmount(mayy?.data);
      const jun = calculateTotalAmount(june?.data);
      const jul = calculateTotalAmount(july?.data);
      const aug = calculateTotalAmount(august?.data);
      const sep = calculateTotalAmount(september?.data);
      const oct = calculateTotalAmount(october?.data);
      const nov = calculateTotalAmount(november?.data);
      const dec = calculateTotalAmount(december?.data);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      if (chartRef.current) {
        chartInstanceRef.current = new ApexCharts(
          chartRef.current,
          chartOption([
            jan,
            feb,
            mar,
            apr,
            may,
            jun,
            jul,
            aug,
            sep,
            oct,
            nov,
            dec,
          ])
        );
        chartInstanceRef.current.render();
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [
    january,
    february,
    march,
    april,
    mayy,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    searchParams.get("year"),
  ]);

  return (
    <div className="flex flex-col gap-8">
      {isLoading ? (
        <div className="flex w-full h-48 justify-center items-center text-center text-white">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1"
                onClick={() => setOpen((prev) => !prev)}
              >
                {searchParams.get("filter") || "Select Filter"}
              </div>
              {open && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li
                    onClick={() => {
                      setSearchParams({ ...queryParams, filter: "date" });
                      setOpen((prev) => !prev);
                    }}
                  >
                    <a>By Date</a>
                  </li>
                  <li
                    onClick={() => {
                      setSearchParams({ ...queryParams, filter: "status" });
                      setOpen((prev) => !prev);
                    }}
                  >
                    <a>By Status</a>
                  </li>
                  <li
                    onClick={() => {
                      setSearchParams({ ...queryParams, filter: "payment" });
                      setOpen((prev) => !prev);
                    }}
                  >
                    <a>By Payment Method</a>
                  </li>
                </ul>
              )}
            </div>
            {searchParams.get("filter") && (
              <p
                className="text-white text-lg cursor-pointer"
                onClick={() => {
                  const { filter, ...rest } = queryParams;
                  setSearchParams({ ...rest });
                }}
              >
                RESET
              </p>
            )}
          </div>
          {(searchParams.get("filter") === "date" ||
            !searchParams.get("filter")) && (
            <div className="flex flex-col gap-2">
              <h2 className="font-medium text-base text-white">
                Total Transaction By Date
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="rounded-md bg-gray-900 px-7 py-6">
                  <div className="text-center">
                    <h4 className="text-title-md font-bold text-white">
                      Transaction Today
                    </h4>
                    <span className="text-sm font-medium text-white">
                      {formatRupiah(totalTransactionDayAmount)}
                    </span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-900 px-7 py-6">
                  <div className="text-center">
                    <h4 className="text-title-md font-bold text-white">
                      Transaction Week
                    </h4>
                    <span className="text-sm font-medium text-white">
                      {formatRupiah(totalTransactionWeekAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {searchParams.get("filter") === "payment" && (
            <div className="flex flex-col gap-2">
              <h2 className="font-medium text-base text-white">
                Total Transaction By Payment Method
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <Card
                  label="Transaction Method Cash"
                  value={formatRupiah(totalTransactionCashAmount)}
                />
                <Card
                  label="Transaction Method QRIS"
                  value={formatRupiah(totalTransactionQrisAmount)}
                />
              </div>
            </div>
          )}
          {searchParams.get("filter") === "status" && (
            <div className="flex flex-col gap-2">
              <h2 className="font-medium text-base text-white">
                Total Transaction By Status
              </h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <Card
                  label="Transaction Status Paid"
                  value={formatRupiah(totalTransactionPaidAmount)}
                />
                <Card
                  label="Transaction Status Unpaid"
                  value={formatRupiah(totalTransactionUnpaidAmount)}
                />
                <Card
                  label="Transaction Status Cancel"
                  value={formatRupiah(totalTransactionCancelAmount)}
                />
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex items-center justify-end">
        <div className="w-72 mr-10">
          <DatePicker
            format="yyyy-MM"
            style={{ width: "100%" }}
            onChange={(e) =>
              setSearchParams({
                ...queryParams,
                month: ((e?.getMonth() as number) + 1).toString(),
                year: e?.getFullYear().toString() as string,
              })
            }
          />
        </div>
      </div>
      <div className="col-span-12 rounded-sm border border-stroke bg-gray-900 px-5 pb-5 pt-7 shadow-default sm:px-7">
        {isLoadingAllMonth() ? (
          <div className="flex w-full h-48 justify-center items-center text-center text-white">
            Loading...
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-bold text-white">
                Total Transaction Month in{" "}
                {searchParams.get("year") || new Date().getFullYear()}
              </h3>
            </div>
            <div>
              <div id="chartTransaction" ref={chartRef} className="-ml-5"></div>
            </div>
          </>
        )}
      </div>

      <TableAdminLayout title="Transaction Today">
        <TransactionDay
          Transaction={dataTransactionDay?.data}
          isLoading={isLoadingDay}
        />
      </TableAdminLayout>
      <TableAdminLayout title="Transaction Week">
        <TransactionWeek
          Transaction={dataTransactionWeek?.data}
          isLoading={isLoadingWeek}
        />
      </TableAdminLayout>
    </div>
  );
};

export default Dashboard;
