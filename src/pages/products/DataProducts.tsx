import ProductsTable from "../../components/dashboard/product/ProductsTable";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const DataProductPage = () => {
  return (
    <>
      <TableAdminLayout title="Product" action="Data">
        <ProductsTable />
      </TableAdminLayout>
    </>
  );
};

export default DataProductPage;
