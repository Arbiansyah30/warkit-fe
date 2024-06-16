import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
const FilterProduct = () => {
  const [isActive, setIsActive] = useState<string>("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 flex-wrap text-md">
        <button className="bg-white px-3 py-1 flex gap-1 items-center shadow-sm shadow-slate-600 hover:scale-105"> <IoFilter /> Filter</button>
        <button className="bg-white px-3 py-1 flex gap-1 items-center shadow-sm shadow-slate-600 hover:scale-105"> <MdOutlineSort /> Urutkan</button>
      </div>
      <div className="flex gap-2 flex-wrap text-sm">
        <button className={`border border-primary px-3 py-1 rounded-full ${isActive === "" && "bg-primary text-white"}`} onClick={() => setIsActive("")}>Semua</button>
        <button className={`border border-primary px-3 py-1 rounded-full ${isActive === "makanan" && "bg-primary text-white"}`} onClick={() => setIsActive("makanan")}>Makanan</button>
        <button className={`border border-primary px-3 py-1 rounded-full ${isActive === "minuman" && "bg-primary text-white"}`} onClick={() => setIsActive("minuman")}>Minuman</button>
      </div>
    </div>
  );
};

export default FilterProduct;
