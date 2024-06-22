import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";
import OrderDetail from "../../components/dashboard/order/OrderDetail";
import React from "react";

const DetailOrderPage: React.FC = () => {
  return (
    <>
      <NavbarTableAdmin title="Order" action="Detail" />
      <OrderDetail />
    </>
  );
};

export default DetailOrderPage;
