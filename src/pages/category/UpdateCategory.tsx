import FormUpdateCategory from "../../components/dashboard/category/FormUpdateCategory";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const UpdateCategoryPage = () => {
  return (
    <TableAdminLayout action="Update" title="Category">
      <FormUpdateCategory />
    </TableAdminLayout>
  );
};

export default UpdateCategoryPage;
