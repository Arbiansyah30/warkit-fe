import { IncomeContent } from "../../components/dashboard/income/IncomeContent";
import TableAdminLayout from "../../components/global/admin/TableAdminLayout";

const IncomeView = () => {
  return (
    <TableAdminLayout action="Data" title="Income">
      <IncomeContent />
    </TableAdminLayout>
  );
};

export default IncomeView;
