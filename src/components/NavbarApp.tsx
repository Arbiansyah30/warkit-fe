import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Section from "../container/Section";
import { ProductQty } from "./CardProduct";

const NavbarApp = () => {
  const [cart, setCart] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const listenScrollEvent = (): void => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const updateCart = () => {
    const cartItems: ProductQty[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setCart(totalQty);
  };

  useEffect(() => {
    updateCart();
    const interval = setInterval(updateCart, 1000); // Periksa setiap detik

    return () => clearInterval(interval); // Bersihkan interval pada unmount
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999]">
      <Section
        className={`flex items-center z-[9999] duration-200 bg-blue ${
          isScroll
            ? "bg-[#eaeaea] py-3"
            : "bg-[rgba(0,0,0,0.2)] py-5 text-white"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">POS</h1>
          </div>
          <div
            className={`flex ${
              isScroll ? "text-black bg-white" : "text-white bg-black"
            } px-3 rounded-md items-center text-xl gap-2`}
          >
            <FaCartShopping />
            <p className="text-lg ">Cart{cart}</p>
          </div>
        </div>
      </Section>
    </nav>
  );
};

export default NavbarApp;
