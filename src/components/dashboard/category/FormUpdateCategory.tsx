import { useEffect, useState } from "react";
import Input from "../../global/Input";
import { CategoryBodyModel } from "@model/category";
import { useCategoryById, useCategoryUpdate } from "@hooks/home/useCategory";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const InitialValue: CategoryBodyModel = {
  name: "",
};

const FormUpdateCategory = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useCategoryById();
  const mutation = useCategoryUpdate();

  useEffect(() => {
    if (category && category.data) {
      console.log(category.data);
      const { name } = category.data;
      
      // const categoryId = category ? category.id : "";
      setCategoryBody({
        name,
      });
    }
  }, [category]);

  const [categoryBody, setCategoryBody] = useState<CategoryBodyModel>({
    ...InitialValue,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryBodyModel, string>>
  >({});

  const validate = () => {
    const newErrors: Partial<Record<keyof CategoryBodyModel, string>> = {};

    let isValid = true;

    if (!categoryBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync(categoryBody);
  };

  const handleReset: () => void = () => {
    setCategoryBody(InitialValue);
    setErrors({});
  };

  const queryClient = useQueryClient();
  useEffect(() => {
    return queryClient.removeQueries({ queryKey: ["categories"] });
  }, [id]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Update Category</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter Category Name"
                error={errors.name}
                name="name"
                value={categoryBody.name}
                onChange={(e) => {
                  setCategoryBody({ ...categoryBody, name: e.target.value });
                }}
              >
                Category Name
              </Input>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateCategory;
