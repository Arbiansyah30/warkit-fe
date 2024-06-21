import FormUpdateCategory from "../../components/dashboard/category/FormUpdateCategory";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const UpdateCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Update" />
      <FormUpdateCategory />
    </>
  );
};

export default UpdateCategoryPage;
