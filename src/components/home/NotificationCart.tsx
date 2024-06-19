import { ProductModelWithQty } from "@model/product";
import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { formatRupiah } from "../../libs/helper";
import Button from "../global/Button";
import Input from "../global/Input";
import DrawerMethodPayment from "./DrawerPaymentMethod";

type NotificationCartProps = {
  cart: ProductModelWithQty[];
  cartCount: number;
  isScroll: boolean;
  updateCart: () => void;
};

const NotificationCart: React.FC<NotificationCartProps> = ({
  cart,
  cartCount,
  isScroll,
  updateCart,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, setName] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [show, setShow] = useState(false);

  const [isError, setIsError] = useState<boolean>(false);
  const handleClick = () => setDropdownOpen(!dropdownOpen);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = cart.map((item) => item.id || "");
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleDeleteSelected = () => {
    const updatedCart = cart.filter(
      (item) => !selectedItems.includes(item.id || "")
    );
    setSelectedItems([]);
    setSelectAll(false);
    setCartToLocalStorage(updatedCart);
    updateCart();
  };

  const handleIncrement = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 0) + 1 } : item
    );
    setCartToLocalStorage(updatedCart);
    updateCart();
  };

  const handleDecrement = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max((item.qty || 0) - 1, 0) } : item
    );
    setCartToLocalStorage(updatedCart);
    updateCart();
  };

  const setCartToLocalStorage = (updatedCart: ProductModelWithQty[]) => {
    const cartItems = updatedCart.map((item) => ({
      id: item.id,
      qty: item.qty,
    }));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 0),
    0
  );

  const handlePayment = () => {
    setShow((prev) => !prev);
    setIsError((prev) => !prev);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsError(false);
      return;
    }
    setName(e.target.value);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          className={`flex ${
            isScroll ? "text-black" : "text-white"
          } px-3 rounded-md items-center text-xl gap-1`}
        >
          <FaCartShopping className="text-sm" />
          <p className="text-xs">
            Cart{" "}
            <span className="bg-blue-900 text-white rounded-full px-1">
              {cartCount}
            </span>
          </p>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {/* <input
                placeholder="Masukan Nama Anda"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              /> */}
              <Input
                placeholder="Input your name"
                type="text"
                error={isError}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-2 flex text-sm justify-between items-center gap-5">
              {/* <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md"
                onClick={handleSelectAll}
              >
                {selectAll ? "Deselect All" : "Select All"}
              </button> */}
              {/* <button
                className="bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={handleDeleteSelected}
              >
                Delete Selected
              </button> */}
              <Button primary sizes="sm" onClick={handleSelectAll}>
                {selectAll ? "Deselect All" : "Select All"}
              </Button>
              <Button danger sizes="sm" onClick={handleDeleteSelected}>
                Delete Selected
              </Button>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id || "")}
                      onChange={() => handleSelectItem(item.id || "")}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 text-gray-900 px-2  rounded-l-md"
                          onClick={() => handleDecrement(item.id || "")}
                        >
                          -
                        </button>
                        <p className="px-2 text-black">{item.qty}</p>
                        <button
                          className="bg-gray-200 text-gray-900 px-2  rounded-r-md"
                          onClick={() => handleIncrement(item.id || "")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatRupiah(item.price || 0)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">
                Total: {formatRupiah(total || 0)}
              </p>
              <button
                onClick={handlePayment}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
      <DrawerMethodPayment
        onHide={() => setShow((prev) => !prev)}
        show={show}
      />
    </>
  );
};

export default NotificationCart;
