import ProductsTable from "../../components/dashboard/product/ProductsTable";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const DataProductPage = () => {
  return (
    <>
      <TableAdminLayout title="Product" action="Data" searchField>
        <ProductsTable />
      </TableAdminLayout>
    </>
  );
};

export default DataProductPage;
