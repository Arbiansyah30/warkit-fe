import FormUpdateProduct from "../../components/dashboard/product/FormUpdateProduct";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const UpdateProductsPage = () => {
  return (
    <>
      <TableAdminLayout action="Update" title="Product">
        <FormUpdateProduct />
      </TableAdminLayout>
    </>
  );
};

export default UpdateProductsPage;
