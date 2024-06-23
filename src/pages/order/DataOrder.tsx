import OrderTable from "../../components/dashboard/order/OrderTable";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const DataOrderPage = () => {
  return (
    <>
      <TableAdminLayout title="Transaction" action="Data">
        <OrderTable />
      </TableAdminLayout>
    </>
  );
};

export default DataOrderPage;
