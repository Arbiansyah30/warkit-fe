import ProductsTable from "../../components/dashboard/product/ProductsTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const DataProductPage = () => {
  return (
    <>
      <NavbarTableAdmin title="Product" action="Data" />
      <ProductsTable />
    </>
  );
};

export default DataProductPage;
