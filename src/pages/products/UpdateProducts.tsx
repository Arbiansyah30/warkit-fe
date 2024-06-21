import ProductUpdate from "../../components/dashboard/product/ProductsUpdate";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Update" />
      <ProductUpdate />
    </>
  );
};

export default UpdateProductsPage;
