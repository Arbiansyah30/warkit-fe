import CategoryTable from "../../components/dashboard/category/CategoryTable";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const CategoryView = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" />
      <CategoryTable />
    </>
  );
};

export default CategoryView;
