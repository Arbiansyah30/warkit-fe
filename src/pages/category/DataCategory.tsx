import CategoryTable from "../../components/dashboard/category/CategoryTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const DataCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" />
      <CategoryTable />
    </>
  );
};

export default DataCategoryPage;
