import { useCategory } from "@hooks/home/useCategory";
import { MdArrowDropDown } from "react-icons/md";

const ProductAdd = () => {
  const { data: category } = useCategory();
  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Tambah Products</h3>
        </div>
        <form action="#">
          <div className="p-6">
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Nama Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Nama Product"
                className="w-full rounded border-[1px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                name="name"
              />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Kategori
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="categoryId"
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary active:border-primary dark:focus:border-primary"
                >
                  <option className="text-black">Pilih Kategori</option>
                  {category?.data?.map((option, index) => (
                    <option key={index} value={option.id} className="text-black">
                      {option.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                  <MdArrowDropDown className="fill-current" size={24} />
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Stok Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Berapa Stok Produk"
                className="w-full rounded border-[1px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                name="stock"
              />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Harga Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Harga Produk"
                className="w-full rounded border-[1px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="mx-auto">
                <img
                  src={""}
                  alt="Buku Yang Mau di Upload"
                  className="max-w-[200px] h-[200px] max-h-[200px] mx-auto"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Harga Produk
                </label>
                <input
                  type="file"
                  name="image"
                  placeholder="Masukkan URL Gambar Buku"
                  className="w-full rounded border-[1px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-5">
              <button className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-black hover:bg-opacity-90">
                Reset
              </button>
              <button className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-opacity-90">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
