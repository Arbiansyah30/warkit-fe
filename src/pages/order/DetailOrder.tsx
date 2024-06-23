import React from "react";
import OrderDetail from "../../components/dashboard/order/OrderDetail";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const DetailOrderPage: React.FC = () => {
  return (
    <>
      <TableAdminLayout title="Order" action="Detail">
        <OrderDetail />
      </TableAdminLayout>
    </>
  );
};

export default DetailOrderPage;
