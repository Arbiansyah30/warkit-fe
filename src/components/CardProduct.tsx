import { formatRupiah } from "../services";
import { ProductItem } from "./ListProduct";

const CardProduct = ({ product }: { product: ProductItem }) => {
  return (
    <div className="text-center px-3 py-4 bg-white shadow-xl h-full flex flex-col justify-between">
      <div className="w-full max-h-[180px] rounded-md overflow-hidden">
        <img src={product.img} alt="Product" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p>{formatRupiah(product.price)}</p>
        <button className="bg-blue-900 w-full py-1 text-white hover:opacity-90">Add to Cart</button>
      </div>
    </div>
  );
};

export default CardProduct;
