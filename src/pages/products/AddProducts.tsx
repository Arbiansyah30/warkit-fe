import ProductAdd from "../../components/dashboard/product/ProductsAdd";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const ProductAddPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Tambah" />
      <ProductAdd />
    </>
  );
};

export default ProductAddPage;
