import { useCategory } from "@hooks/home/useCategory";
import { useProductCreation } from "@hooks/home/useProduct";
import { ProductBodyModel } from "@model/product";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import DefaultImage from "../../../assets/default-image.png";
import Input from "../../global/Input";
import { useAtom } from "jotai";
import { loadingBarAtom } from "../../../store/loadingBar";

const InitialValue: ProductBodyModel = {
  name: "",
  category: {
    id: "",
    name: "",
  },
  price: 0,
  image: "",
  stock: 0,
};

interface ImageFile extends File {
  preview: string;
}

const FormAddProduct = () => {
  const mutation = useProductCreation();
  const { data: category, isLoading } = useCategory();

    // global
    const [, setLoadingBar] = useAtom(loadingBarAtom);

    // loading bar
    useEffect(() => {
      setLoadingBar(mutation.isPending || isLoading);
    }, [mutation.isPending, isLoading]);

  const [productBody, setProductBody] = useState<ProductBodyModel>({
    ...InitialValue,
  });
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductBodyModel, string>>
  >({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ProductBodyModel, string>> = {};

    let isValid = true;

    if (!productBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!productBody.category?.id) {
      newErrors.category = "Category is required";
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
      if (key === "category") {
        formData.append("categoryId", value.id);
      } else {
        formData.append(key, value);
      }
    });

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    console.log({ imageFile, file: productBody.image });

    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
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
  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Add Products</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter Product Name"
                error={errors.name}
                name="name"
                value={productBody.name}
                onChange={(e) => {
                  setProductBody({ ...productBody, name: e.target.value });
                }}
              >
                Product Name
              </Input>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">Category</label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="categoryId"
                  className={`relative z-20 w-full bg-transparent appearance-none rounded border px-3 py-2 outline-none transition focus:border-primary active:border-primary dark:focus:border-primary ${
                    errors.category ? "border-red-500" : "border-stroke"
                  }`}
                  value={productBody.category?.id}
                  onChange={(e) => {
                    setProductBody({
                      ...productBody,
                      category: {
                        id: e.target.value,
                        name: e.target.selectedOptions[0].getAttribute(
                          "data-name"
                        ) as string,
                      },
                    });
                  }}
                >
                  <option className="text-black" value="" hidden>
                    Select Category
                  </option>

                  {category?.data?.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      data-name={option.name}
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
              {errors.category && (
                <p className="text-[#DC2626] text-xs">{errors.category}</p>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter Product Stock"
                error={errors.stock}
                name="stock"
                value={productBody.stock}
                onChange={(e) => {
                  setProductBody({
                    ...productBody,
                    stock: parseInt(e.target.value) || 0,
                  });
                }}
              >
                Product Stock
              </Input>
            </div>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter Product Price"
                error={errors.price}
                name="price"
                value={productBody.price}
                onChange={(e) => {
                  setProductBody({
                    ...productBody,
                    price: parseInt(e.target.value) || 0,
                  });
                }}
              >
                Product Price
              </Input>
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
                <Input
                  type="file"
                  name="image"
                  placeholder="Upload Image Product"
                  error={errors.image}
                  onChange={handleChangeImage}
                >
                  Upload Image
                </Input>
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

export default FormAddProduct;
