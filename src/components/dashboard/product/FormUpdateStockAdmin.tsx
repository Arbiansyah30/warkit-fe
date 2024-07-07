import { useProductById, useProductCreation } from "@hooks/home/useProduct";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../global/Input";

interface IStock {
  error: string;
  value: number;
}

const FormUpdateStockAdmin = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProductById();
  const mutation = useProductCreation();

  const [stock, setStock] = useState<IStock>({
    error: "",
    value: product?.data?.stock || 0,
  });

  if (isLoading) {
    return <div className="w-full text-center">Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stock.value) {
      setStock((prev) => ({ ...prev, error: "Stock is required" }));
    }
    const formData = new FormData();
    formData.append("id", id as string);
    formData.append("stock", stock.value.toString());

    await mutation.mutateAsync({
      data: formData,
      type: "update",
      id,
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-md border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Update Product</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter Category Name"
                error={stock?.error}
                name="name"
                // value={categoryBody.name}
                defaultValue={product?.data?.stock}
                onChange={(e) => {
                  setStock((prev) => ({
                    ...prev,
                    value: Number(e.target.value),
                  }));
                }}
              >
                Product Stock
              </Input>
            </div>
            <div className="flex justify-center items-center gap-5">
              {/* <button
                onClick={() => handleReset()}
                type="reset"
                className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-black hover:bg-opacity-90"
              >
                Reset
              </button> */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`flex w-full justify-center rounded ${
                  mutation.isPending ? "bg-gray-300" : "bg-blue-600"
                } p-3 font-medium text-white hover:bg-opacity-90`}
              >
                {mutation.isPending ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateStockAdmin;
