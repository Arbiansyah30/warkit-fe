import FormUpdateProduct from "../../components/dashboard/product/FormUpdateProduct";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Update" />
      <FormUpdateProduct />
    </>
  );
};

export default UpdateProductsPage;