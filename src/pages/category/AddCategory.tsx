import FormAddCategory from "../../components/dashboard/category/FormAddCategory";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const AddCategoryPage = () => {
  return (
    <>
      <TableAdminLayout action="Add" title="Category">
        <FormAddCategory />
      </TableAdminLayout>
    </>
  );
};

export default AddCategoryPage;
