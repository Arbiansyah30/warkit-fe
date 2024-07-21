import { useTransaction, useTransactionToday, useTransactionWeek } from "@hooks/home/useTransactionCreation";
import {
  TransactionDay,
  TransactionWeek,
} from "../../components/dashboard/dashboard";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";
import { formatRupiah } from "../../libs/helper";
import { TransactionModel } from "@model/transaction";

const Dashboard = () => {
  const { data: Transaction, isLoading } = useTransaction();
  const { data: dataTransactionDay, isLoading: isLoadingDay } = useTransactionToday();
  const { data: dataTransactionWeek, isLoading: isLoadingWeek } = useTransactionWeek();

  const calculateTotalAmount = (transactions: TransactionModel[] | undefined) => {
    return transactions?.reduce((total, transaction) => {
      return total + (transaction.totalAmount || 0);
    }, 0) || 0;
  };

  const calculateTotalByPaymentMethod = (transactions: TransactionModel[] | undefined, method: string) => {
    return transactions?.reduce((total, transaction) => {
      return transaction.paymentMethod === method ? total + (transaction.totalAmount || 0) : total;
    }, 0) || 0;
  };

  const totalTransactionDayAmount = calculateTotalAmount(dataTransactionDay?.data);
  const totalTransactionWeekAmount = calculateTotalAmount(dataTransactionWeek?.data);
  const totalTransactionQrisAmount = calculateTotalByPaymentMethod(Transaction?.data, 'QRIS');
  const totalTransactionCashAmount = calculateTotalByPaymentMethod(Transaction?.data, 'CASH');

  if (isLoading) return (
        <div className="flex w-full h-48 justify-center items-center text-center text-white">
          Loading...
        </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <div className="rounded-md bg-gray-900 px-7 py-6">
            <div className="text-center">
              <h4 className="text-title-md font-bold text-white">
                Total Transaction Today
              </h4>
              <span className="text-sm font-medium">{ formatRupiah(totalTransactionDayAmount) }</span>
            </div>
        </div>
        <div className="rounded-md bg-gray-900 px-7 py-6">
            <div className="text-center">
              <h4 className="text-title-md font-bold text-white">
                Total Transaction Week
              </h4>
              <span className="text-sm font-medium">{ formatRupiah(totalTransactionWeekAmount) }</span>
            </div>
        </div>
        <div className="rounded-md bg-gray-900 px-7 py-6">
            <div className="text-center">
              <h4 className="text-title-md font-bold text-white">
                Total Transaction Method QRIS
              </h4>
              <span className="text-sm font-medium">{ formatRupiah(totalTransactionQrisAmount) }</span>
            </div>
        </div>
        <div className="rounded-md bg-gray-900 px-7 py-6">
            <div className="text-center">
              <h4 className="text-title-md font-bold text-white">
                Total Transaction Method CASH
              </h4>
              <span className="text-sm font-medium">{ formatRupiah(totalTransactionCashAmount) }</span>
            </div>
        </div>


      </div>
      <TableAdminLayout title="Transaction Today">
        <TransactionDay Transaction={dataTransactionDay?.data} isLoading={isLoadingDay} />
      </TableAdminLayout>
      <TableAdminLayout title="Transaction Week">
        <TransactionWeek Transaction={dataTransactionWeek?.data} isLoading={isLoadingWeek} />
      </TableAdminLayout>
    </div>
  );
};

export default Dashboard;
