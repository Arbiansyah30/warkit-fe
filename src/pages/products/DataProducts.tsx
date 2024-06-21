import ProductsTable from "../../components/dashboard/product/ProductsTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const ProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" />
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
