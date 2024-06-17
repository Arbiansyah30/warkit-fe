import { useProduct } from "@hooks/home/useProduct";
import Section from "../container/Section";
import CardProduct from "./CardProduct";
import FilterProduct from "./FilterProduct";

const ListProduct = () => {
  const { data: products } = useProduct();

  return (
    <div className="min-h-[100vh] bg-[#dddddd] rounded-t-[50px] py-10 -my-20 z-10 relative">
      <Section className="flex flex-col gap-5">
        <FilterProduct />
        <div className="grid py-3 max-sm:grid-cols-2 max-lg:grid-cols-3 max-2xl:grid-cols-4 grid-cols-5 max-sm:gap-3 gap-5 items-center justify-center">
          {products?.data?.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              stock={item.stock}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ListProduct;
