import Section from "../container/Section";
import CardProduct from "./CardProduct";
import FilterProduct from "./FilterProduct";

export interface ProductItem {
  id: number;
  img: string;
  name: string;
  price: number;
  type: string;
}

const product: ProductItem[] = [
  {
    id: 1,
    img: "https://picsum.photos/id/1/200/300?random=2",
    name: "Product 1",
    price: 1000,
    type: "makanan",
  },
  {
    id: 2,
    img: "https://picsum.photos/id/1/200/300?random=2",
    name: "Product 2",
    price: 2000,
    type: "minuman",
  },
  {
    id: 3,
    img: "https://picsum.photos/id/1/200/300?random=2",
    name: "Product 3",
    price: 3000,
    type: "makanan",
  },
];

const ListProduct = () => {
  return (
    <div className="min-h-[300px] bg-[#dddddd] rounded-t-[50px] py-10 -m-4 z-10 relative">
      <Section className="flex flex-col gap-5">
        <FilterProduct />
        <div className="grid py-3 max-sm:grid-cols-2 max-lg:grid-cols-3 max-2xl:grid-cols-4 grid-cols-5 max-sm:gap-3 gap-5 items-center justify-center">
          {product.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ListProduct;
