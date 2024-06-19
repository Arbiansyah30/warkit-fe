import ProductAdd from "../../components/dashboard/product/ProductsAdd";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const AddProductPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Add" />
      <ProductAdd />
    </>
  );
};

export default AddProductPage;
