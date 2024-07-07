import {
  TransactionDay,
  TransactionWeek,
} from "../../components/dashboard/dashboard";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-20">
      <TableAdminLayout title="Transaction Today">
        <TransactionDay />
      </TableAdminLayout>
      <TableAdminLayout title="Transaction Week">
        <TransactionWeek />
      </TableAdminLayout>
    </div>
  );
};

export default Dashboard;
