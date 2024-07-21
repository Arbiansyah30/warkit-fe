import { useCategoryFilter } from "@hooks/home/useCategory";
import { CategoryModel } from "@model/category";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../libs/helper";

const FilterProduct = () => {
  const [isActive, setIsActive] = useState<string>("");
  const { data: category } = useCategoryFilter();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const handleSelect = ({ name, id }: CategoryModel) => {
    setIsActive(name as string);
    setSearchParams({ ...queryParams, categoryId: String(id) });
  };

  const handleReset = () => {
    setIsActive(""), setSearchParams({ ...queryParams, categoryId: "" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap text-sm">
        <button
          className={`border border-primary px-3 py-1 rounded-full ${
            isActive === "" && "bg-blue-900 text-white"
          }`}
          onClick={handleReset}
        >
          Semua
        </button>
        {category?.data?.map((item) => (
          <button
            key={item.id}
            className={`border border-primary px-3 py-1 rounded-full ${
              isActive === item.name && "bg-blue-900 text-white"
            }`}
            onClick={() => handleSelect({ name: item.name, id: item.id })}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterProduct;
