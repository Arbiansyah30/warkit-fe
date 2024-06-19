import { useProduct } from "@hooks/home/useProduct";
import useResponsive from "@hooks/useResponsive";
import { useSearchParams } from "react-router-dom";
import Section from "../../container/Section";
import { convertQueryParamsToObject } from "../../libs/helper";
// import Input from "../global/Input";
import Input from "../global/Input";
import CardProduct from "./CardProduct";
import FilterProduct from "./FilterProduct";

const ListProduct = () => {
  const { data: products } = useProduct();
  const { isTablet } = useResponsive();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...queryParams, search: e.target.value });
  };

  return (
    <div className="min-h-[100vh] bg-[#dddddd] rounded-t-[40px] py-10 -my-20 z-10 relative">
      <Section className="flex flex-col gap-3">
        <div
          className={
            isTablet
              ? "flex flex-col gap-4 justify-center"
              : "flex justify-between items-center"
          }
        >
          <FilterProduct />
          <div className={isTablet ? "w-full" : "w-1/3"}>
            <Input
              sizes="sm"
              placeholder="Search Product..."
              onChange={handleChangeSearch}
            />
          </div>
        </div>
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
