import FormUpdateProduct from "../../components/dashboard/product/FormUpdateProduct";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Update" data="product" link="/admin/products" />
      <FormUpdateProduct />
    </>
  );
};

export default UpdateProductsPage;
