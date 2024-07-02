import { useCategoryCreation } from "@hooks/home/useCategory";
import { CategoryBodyModel } from "@model/category";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { loadingBarAtom } from "../../../store/loadingBar";
import Input from "../../global/Input";

const InitialValue: CategoryBodyModel = {
  name: "",
};

const FormAddCategory = () => {
  const mutation = useCategoryCreation();
  console.log("mutation", mutation);

  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setLoadingBar(mutation.isPending);
  }, [mutation.isPending]);

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

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      type: "create",
      data: {
        name: categoryBody.name,
      },
    });
  };

  const handleReset: () => void = () => {
    setCategoryBody(InitialValue);
    setErrors({});
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-md border border-stroke text-white bg-gray-900 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
          <h3 className="font-medium">Add Category</h3>
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
                disabled={mutation.isPending}
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
                className={`flex w-full justify-center rounded ${
                  mutation.isPending ? "bg-gray-300" : "bg-blue-600"
                } p-3 font-medium text-white hover:bg-opacity-90`}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddCategory;
