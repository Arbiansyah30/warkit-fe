import FormAddProduct from "../../components/dashboard/product/FormAddProduct";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const AddProductPage = () => {
  return (
    <>
      <NavbarTableAdmin action="Add" title="Product" />
      <FormAddProduct />
    </>
  );
};

export default AddProductPage;
