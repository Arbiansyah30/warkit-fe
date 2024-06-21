import CategoryTable from "../../components/dashboard/category/CategoryTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const DataCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin action="Data" title="Category" />
      <CategoryTable />
    </>
  );
};

export default DataCategoryPage;
