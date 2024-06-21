import ProductsTable from "../../components/dashboard/product/ProductsTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const ProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin title="Product" action="Data" />
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
