import OrderTable from "../../components/dashboard/order/OrderTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const DataOrderPage = () => {
  return (
    <>
      <NavbarTableAdmin title="Order" action="Data" />
      <OrderTable />
    </>
  );
};

export default DataOrderPage;
