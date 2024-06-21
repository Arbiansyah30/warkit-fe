import ProductsTable from "../../components/dashboard/product/ProductsTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const ProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" data="product" link="/admin/products" />
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
