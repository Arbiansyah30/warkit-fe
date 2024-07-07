import { useProfile } from "@hooks/home/useProfile";
import FormUpdateProduct from "../../components/dashboard/product/FormUpdateProduct";
import FormUpdateStockAdmin from "../../components/dashboard/product/FormUpdateStockAdmin";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const UpdateProductsPage = () => {
  const { role } = useProfile();
  return (
    <>
      <TableAdminLayout action="Update" title="Product">
        {role.toLowerCase() === "admin" ? (
          <FormUpdateStockAdmin />
        ) : (
          <FormUpdateProduct />
        )}
      </TableAdminLayout>
    </>
  );
};

export default UpdateProductsPage;
