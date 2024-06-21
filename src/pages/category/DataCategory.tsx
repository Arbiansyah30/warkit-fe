import CategoryTable from "../../components/dashboard/category/CategoryTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const DataCategoryPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" data="category" link="/admin/category" />
      <CategoryTable />
    </>
  );
};

export default DataCategoryPage;
