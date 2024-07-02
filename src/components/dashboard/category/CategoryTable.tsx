import { useCategory, useCategoryCreation } from "@hooks/home/useCategory";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";

const CategoryTable = () => {
  const { data: categories, isLoading } = useCategory();
  const mutation = useCategoryCreation();

  // global
  const [, setLoadingBar] = useAtom(loadingBarAtom);

  // loading bar
  useEffect(() => {
    setLoadingBar(isLoading);
  }, [isLoading]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const handleDelete = (id: string) => {
    mutation.mutate({
      type: "delete",
      data: {
        id,
      },
    });
  };

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Category</h4>
          <Link
            to="/admin/category/add"
            className="text-sm font-medium text-white bg-blue-600 py-2 px-4 rounded-full hover:opacity-90"
          >
            Add Category
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead HeadList={["Name", "Actions"]} />
            <TableBody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>
                    <div className="flex w-full h-48 justify-center items-center text-white">
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : !categories?.data?.length ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Categories" action />
                  </td>
                </tr>
              ) : (
                <>
                  {categories?.data?.map((item, index) => (
                    <TableItem
                      key={index}
                      id={item.id}
                      name={item.name}
                      onClickDelete={handleDelete}
                      isPending={mutation.isPending}
                      isSuccess={mutation.isSuccess}
                      isError={mutation.isError}
                    />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={categories?.meta?.page as number}
        totalPages={categories?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default CategoryTable;
