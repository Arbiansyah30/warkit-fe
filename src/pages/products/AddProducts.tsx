import FormAddProduct from "../../components/dashboard/product/FormAddProduct";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const AddProductPage = () => {
  return (
    <>
      <TableAdminLayout action="Add" title="Product">
        <FormAddProduct />
      </TableAdminLayout>
    </>
  );
};

export default AddProductPage;
