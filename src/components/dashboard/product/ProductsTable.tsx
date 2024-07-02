import { useProduct, useProductCreation } from "@hooks/home/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import { loadingBarAtom } from "../../../store/loadingBar";
import EmptyData from "../../global/EmptyData";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";

const ProductsTable = () => {
  const { data: products, isLoading } = useProduct();
  const mutation = useProductCreation();

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

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    return queryClient.removeQueries({ queryKey: ["product"] });
  });

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6 flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Products</h4>
          <Link
            to="/admin/product/add"
            className="text-sm font-medium text-white bg-blue-600 py-2 px-4 rounded-full hover:opacity-90"
          >
            Add Product
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead
              HeadList={[
                "Image",
                "Name",
                "Price",
                "Stock",
                "Category",
                "Actions",
              ]}
            />
            <TableBody>
              {isLoading ? (
                <>
                  <tr>
                    <td colSpan={6}>
                      <div className="flex w-full h-48 justify-center items-center text-white">
                        Loading...
                      </div>
                    </td>
                  </tr>
                </>
              ) : !products?.data?.length ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Product" action />
                  </td>
                </tr>
              ) : (
                <>
                  {products?.data?.map((item) => (
                    <TableItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      image={item.image}
                      price={item.price}
                      stock={item.stock}
                      onClickDelete={handleDelete}
                      isError={mutation.isError}
                      isPending={mutation.isPending}
                      isSuccess={mutation.isSuccess}
                    />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={products?.meta?.page as number}
        totalPages={products?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default ProductsTable;
