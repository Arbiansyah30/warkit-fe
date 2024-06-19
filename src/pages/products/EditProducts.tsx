import ProductAdd from "../../components/dashboard/product/ProductsAdd";
import ProductEdit from "../../components/dashboard/product/ProductsEdit";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const EditProductPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Edit" />
      <ProductEdit />
    </>
  );
};

export default EditProductPage;
