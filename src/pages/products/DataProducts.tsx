import { Link } from "react-router-dom";
import ProductData from "../../components/dashboard/product/ProductsData";
import NavbarTableAdmin from "../../components/global/admin/NavbarTableAdmin";

const ProductsPage = () => {
  return (
    <>
      <NavbarTableAdmin detail="Data" />
      <ProductData />
    </>
  );
};

export default ProductsPage;
