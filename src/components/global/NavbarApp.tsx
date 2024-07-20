import { useProduct } from "@hooks/home/useProduct";
import { ProductModel, ProductModelWithQty } from "@model/product";
import { useEffect, useState } from "react";
import LOGO from "../../assets/images/LOGO.png";
import Section from "../../container/Section";
import NotificationCart from "../home/NotificationCart";

interface CartItem {
  id: string;
  qty: number;
}

const NavbarApp = () => {
  const [cart, setCart] = useState<ProductModel[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { data: products } = useProduct({ all: true });
  const [localProducts, setLocalProducts] = useState<ProductModel[]>([]);

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
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = cartItems
      .map((item: CartItem) => {
        const product = localProducts.find(
          (product: ProductModel) => product.id === item.id
        );
        return product ? { ...product, qty: item.qty } : null;
      })
      .filter(Boolean);

    setCart(updatedCart);

    const totalQty = updatedCart.reduce(
      (acc: number, item: ProductModelWithQty) => acc + (item.qty || 0),
      0
    );
    setCartCount(totalQty);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateCart();
    }, 1000); // Periksa setiap detik
    return () => clearInterval(interval);
  }, [localProducts]);

  useEffect(() => {
    if (products?.data) {
      setLocalProducts(products.data);
    }
  }, [products]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999]">
      <Section
        className={`flex items-center z-[9999] duration-200 ${
          isScroll
            ? "bg-[#eaeaea] py-3"
            : "bg-[rgba(0,0,0,0.4)] py-5 text-white"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <img src={LOGO} width={70} />
          </div>
          <NotificationCart
            cart={cart}
            cartCount={cartCount}
            isScroll={isScroll}
            updateCart={updateCart}
          />
        </div>
      </Section>
    </nav>
  );
};

export default NavbarApp;
