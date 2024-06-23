import CategoryTable from "../../components/dashboard/category/CategoryTable";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const DataCategoryPage = () => {
  return (
    <>
      <TableAdminLayout action="Data" title="Category">
        <CategoryTable />
      </TableAdminLayout>
    </>
  );
};

export default DataCategoryPage;
