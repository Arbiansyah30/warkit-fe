import FormAddCategory from "../../components/dashboard/category/FormAddCategory";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const AddCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin action="Add" title="Category" />
      <FormAddCategory />
    </>
  );
};

export default AddCategoryPage;
