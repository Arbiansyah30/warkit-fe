import { ProductModel } from "@model/product";
import { formatRupiah } from "../libs/helper";

export interface ProductQty {
  id: string;
  qty: number;
}

const CardProduct = ({ image, name, price, stock, id }: ProductModel) => {
  const handleButton = () => {
    const cart: ProductQty[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex(
      (item: ProductQty) => (item?.id as string) === id
    );
    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({ id: id as string, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };
  return (
    <div className="text-center px-3 py-4 bg-white shadow-xl h-full flex flex-col justify-between">
      <div className="w-full max-h-[180px] rounded-md overflow-hidden">
        <img src={image} alt="Product" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-xl font-semibold">{name}</h1>
        <p>{formatRupiah(price as number)}</p>
        <div className="flex gap-1 flex-wrap justify-between text-[13px] mb-1">
          <p>stock: {stock}</p>
          {(stock as number) > 0 ? (
            <p className="bg-green-600 text-white rounded-md px-1">Tersedia</p>
          ) : (
            <p className="bg-red-600 text-white rounded-md px-1">Habis</p>
          )}
        </div>
        <button
          className="bg-blue-900 w-full py-1 text-white hover:opacity-90"
          onClick={handleButton}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
