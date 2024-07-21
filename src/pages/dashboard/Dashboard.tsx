import {
  useTransaction,
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

const Dashboard = () => {
  const { data: Transaction, isLoading } = useTransaction();
  const { data: dataTransactionDay, isLoading: isLoadingDay } =
    useTransactionToday();
  const { data: dataTransactionWeek, isLoading: isLoadingWeek } =
    useTransactionWeek();

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
