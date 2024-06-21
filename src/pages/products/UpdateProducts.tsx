import FormUpdateProduct from "../../components/dashboard/product/FormUpdateProduct";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin action="Update" title="Product" />
      <FormUpdateProduct />
    </>
  );
};

export default UpdateProductsPage;
