import { ProductModel } from "@model/product";
import toast from "react-hot-toast";
import { formatRupiah } from "../../libs/helper";
import Button from "../global/Button";

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
    toast.success("Product added to cart");
  };

  return (
    <div className="text-center px-3 py-4 bg-white shadow-xl h-full flex flex-col justify-between rounded-md">
      <div className="w-full max-h-[180px] h-full rounded-md overflow-hidden">
        <img
          src={image}
          draggable="false"
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-min">
        <h1 className="text-xl font-semibold line-clamp-2 break-words">{name}</h1>
        <p className="line-clamp-1 break-words">{formatRupiah(price as number)}</p>
        <div className="flex gap-1 flex-wrap justify-between text-[13px] mb-3">
          <p className="text-start">stock :{stock}</p>
          <div className="flex-1 flex justify-end">
            {(stock as number) > 0 ? (
              <p className="bg-green-600 text-white rounded-md px-1">
                Tersedia
              </p>
            ) : (
              <p className="bg-red-600 text-white rounded-md px-1">Habis</p>
            )}
          </div>
        </div>
        {/* <button
          className="bg-blue-900 w-full py-1 text-white hover:opacity-90"
          onClick={handleButton}
        >
          Add to Cart
        </button> */}
        <Button
          sizes="sm"
          primary={!!stock}
          disabled={!stock}
          onClick={handleButton}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CardProduct;
