import FormAddProduct from "../../components/dashboard/product/FormAddProduct";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const AddCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Add" />
      <FormAddProduct />
    </>
  );
};

export default AddCategoryPage;
