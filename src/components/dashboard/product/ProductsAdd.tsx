import { useCategory } from "@hooks/home/useCategory";
import { useProductAdd } from "@hooks/home/useProduct";
import { ProductBodyModel } from "@model/product";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import DefaultImage from "../../../assets/default-image.png";

const InitialValue: ProductBodyModel = {
  name: "",
  categoryId: "",
  price: 0,
  image: "",
  stock: 0,
};

interface ImageFile extends File {
  preview: string;
}

const ProductAdd = () => {
  const [productBody, setProductBody] = useState<ProductBodyModel>({
    ...InitialValue,
  });
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductBodyModel, string>>
  >({});

  const mutation = useProductAdd();

  const validate = () => {
    const newErrors: Partial<Record<keyof ProductBodyModel, string>> = {};

    let isValid = true;

    if (!productBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!productBody.categoryId) {
      newErrors.categoryId = "Category is required";
      isValid = false;
    }
    if (!productBody.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (!productBody.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }
    if (!productBody.stock) {
      newErrors.stock = "Stock is required";
      isValid = false;
    }
    if (typeof productBody.price !== "number") {
      newErrors.price = "Price must be a number";
      isValid = false;
    }

    if (typeof productBody.stock !== "number") {
      newErrors.stock = "Stock must be a number";
      isValid = false;
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted 1:", productBody);
    if (!validate()) return;
    const formData = new FormData();
    Object.entries(productBody).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log({ imageFile, file: productBody.image });

    await mutation.mutateAsync(formData);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Invalid image format. Please upload jpg, jpeg, or png files.",
        }));
        return;
      }

      const newImageFile: ImageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setImageFile(newImageFile);
      setProductBody({ ...productBody, image: file });
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please upload a valid image file.",
      }));
    }
  };

  const handleReset: () => void = () => {
    setProductBody(InitialValue);
    setImageFile(null);
    setErrors({});
  };
  const { data: category } = useCategory();

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Tambah Products</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Nama Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Nama Product"
                className={`w-full rounded border-[1px] bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary ${
                  errors.name ? "border-red-500" : "border-stroke"
                }`}
                name="name"
                value={productBody.name}
                onChange={(e) => {
                  setProductBody({ ...productBody, name: e.target.value });
                }}
              />
              {errors.name && (
                <p className="text-[#DC2626] text-xs">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">Kategori</label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="categoryId"
                  className={`relative z-20 w-full bg-transparent appearance-none rounded border px-3 py-2 outline-none transition focus:border-primary active:border-primary dark:focus:border-primary ${
                    errors.categoryId ? "border-red-500" : "border-stroke"
                  }`}
                  onChange={(e) => {
                    setProductBody({
                      ...productBody,
                      categoryId: e.target.value,
                    });
                  }}
                >
                  <option className="text-black">Pilih Kategori</option>
                  {category?.data?.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      className="text-black"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                  <MdArrowDropDown className="fill-current" size={24} />
                </span>
              </div>
              {errors.categoryId && (
                <p className="text-[#DC2626] text-xs">{errors.categoryId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Stok Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Berapa Stok Produk"
                className={`w-full rounded border-[1px] bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary ${
                  errors.stock ? "border-red-500" : "border-stroke"
                }`}
                name="stock"
                value={productBody.stock}
                onChange={(e) => {
                  setProductBody({
                    ...productBody,
                    stock: parseInt(e.target.value) || 0,
                  });
                }}
              />
              {errors.stock && (
                <p className="text-[#DC2626] text-xs">{errors.stock}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium">
                Harga Produk
              </label>
              <input
                type="text"
                placeholder="Masukan Harga Produk"
                className={`w-full rounded border-[1px] bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary ${
                  errors.price ? "border-red-500" : "border-stroke"
                }`}
                name="price"
                value={productBody.price}
                onChange={(e) => {
                  setProductBody({
                    ...productBody,
                    price: parseInt(e.target.value) || 0,
                  });
                }}
              />
              {errors.price && (
                <p className="text-[#DC2626] text-xs">{errors.price}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="mx-auto">
                <img
                  src={imageFile?.preview || DefaultImage}
                  alt="Buku Yang Mau di Upload"
                  className="max-w-[200px] h-[200px] max-h-[200px] mx-auto"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium">Image</label>
                <input
                  type="file"
                  name="image"
                  placeholder="Masukkan URL Gambar Buku"
                  className={`w-full rounded border-[1px] bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary ${
                    errors.image ? "border-red-500" : "border-stroke"
                  }`}
                  onChange={handleChangeImage}
                />
                {errors.image && (
                  <p className="text-[#DC2626] text-xs">{errors.image}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => handleReset()}
                type="reset"
                className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-black hover:bg-opacity-90"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
