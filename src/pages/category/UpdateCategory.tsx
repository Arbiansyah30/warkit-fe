import FormUpdateCategory from "../../components/dashboard/category/FormUpdateCategory";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin action="Update" title="Category" />
      <FormUpdateCategory />
    </>
  );
};

export default UpdateCategoryPage;
