import { formatRupiah } from "../services";
import { ProductItem } from "./ListProduct";

export interface ProductQty {
  id: number;
  qty: number;
}

const CardProduct = ({ product }: { product: ProductItem }) => {
  const handleButton = () => {
    const cart: ProductQty[]  = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: ProductQty) => item.id === product.id);
    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({id: product.id, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };
  return (
    <div className="text-center px-3 py-4 bg-white shadow-xl h-full flex flex-col justify-between">
      <p className="bg-primary text-white px-3 rounded-t-md  py-1">{product.type}</p>
      <div className="w-full max-h-[150px] rounded-b-md overflow-hidden">
        <img src={product.img} alt="Product" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p>{formatRupiah(product.price)}</p>
        <div className="flex gap-1 flex-wrap justify-between text-[13px] mb-1">
          <p>stock: {product.stock}</p>
          {
            product.stock > 0
              ? <p className="bg-green-600 text-white rounded-md px-1">Tersedia</p>
              : <p className="bg-red-600 text-white rounded-md px-1">Habis</p>
          }
        </div>
        <button className="bg-blue-900 w-full py-1 text-white hover:opacity-90" onClick={handleButton}>Add to Cart</button>
      </div>
    </div>
  );
};

export default CardProduct;
