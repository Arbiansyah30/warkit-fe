import {
  useTransaction,
  useTransactionMonth,
  useTransactionToday,
  useTransactionWeek,
} from "@hooks/home/useTransactionCreation";
import {
  TransactionDay,
  TransactionWeek,
} from "../../components/dashboard/dashboard";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";
import { formatRupiah } from "../../libs/helper";
import { TransactionModel } from "@model/transaction";
import chart from "../../libs/helper/Chart";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: Transaction, isLoading } = useTransaction();
  const { data: dataTransactionDay, isLoading: isLoadingDay } =
    useTransactionToday();
  const { data: dataTransactionWeek, isLoading: isLoadingWeek } =
    useTransactionWeek();
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
    return isLoadingJan &&
    isLoadingFeb &&
    isLoadingMar &&
    isLoadingApr &&
    isLoadingMay &&
    isLoadingJun &&
    isLoadingJul &&
    isLoadingAug &&
    isLoadingSep &&
    isLoadingOct &&
    isLoadingNov &&
    isLoadingDec;
  };
  const calculateTotalAmount = (
    transactions: TransactionModel[] | undefined
  ) => {
    return (
      transactions?.reduce((total, transaction) => {
        return total + (transaction.totalAmount || 0);
      }, 0) || 0
    );
  };

  const calculateTotalByPaymentMethod = (
    transactions: TransactionModel[] | undefined,
    method: string
  ) => {
    return (
      transactions?.reduce((total, transaction) => {
        return transaction.paymentMethod === method
          ? total + (transaction.totalAmount || 0)
          : total;
      }, 0) || 0
    );
  };

  const calculateTotalByStatus = (
    transactions: TransactionModel[] | undefined,
    status: string
  ) => {
    return (
      transactions?.reduce((total, transaction) => {
        return transaction.status === status
          ? total + (transaction.totalAmount || 0)
          : total;
      }, 0) || 0
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

  useEffect(() => {
    console.log("loading all month", isLoadingAllMonth());
     
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
      chart([jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]);
    }
  }, [isLoadingAllMonth()]);

  return (
    <div className="flex flex-col gap-8">
      {isLoading ? (
        <div className="flex w-full h-48 justify-center items-center text-center text-white">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="font-medium text-base text-white">
              Total Transaction By Date
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Today
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionDayAmount)}
                  </span>
                </div>
              </div>
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Week
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionWeekAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-medium text-base text-white">
              Total Transaction By Payment Method
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Method Cash
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionQrisAmount)}
                  </span>
                </div>
              </div>
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Method QRIS
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionCashAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-medium text-base text-white">
              Total Transaction By Status
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Status Paid
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionPaidAmount)}
                  </span>
                </div>
              </div>
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Status Unpaid
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionUnpaidAmount)}
                  </span>
                </div>
              </div>
              <div className="rounded-md bg-gray-900 px-7 py-6">
                <div className="text-center">
                  <h4 className="text-title-md font-bold text-white">
                    Total Transaction Status Cancel
                  </h4>
                  <span className="text-sm font-medium">
                    {formatRupiah(totalTransactionCancelAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="col-span-12 rounded-sm border border-stroke bg-gray-900 px-5 pb-5 pt-7 shadow-default sm:px-7">
        {isLoadingAllMonth() ? (
          <div className="flex w-full h-48 justify-center items-center text-center text-white">
            Loading...
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-bold text-white">
                Total Transaction Month in {new Date().getFullYear()}
              </h3>
            </div>
            <div>
              <div id="chartTransaction" className="-ml-5"></div>
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
