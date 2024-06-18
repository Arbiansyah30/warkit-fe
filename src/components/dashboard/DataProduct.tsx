import { useProduct } from "@hooks/home/useProduct";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject, formatRupiah } from "../../libs/helper";
import Pagination from "../global/Pagination";

const DataProduct = () => {
  const { data: products, isLoading } = useProduct({ perPage: 2 });
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  // const [numb, setNumb] = useState(1);
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  return (
    <>
      <div className="rounded-sm border bg-gray-900 text-white">
        <div className="px-4 py-6 md:px-6 xl:px-7">
          <h4 className="text-xl font-bold text-white">Data Products</h4>
        </div>

        <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sold</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Profit</p>
          </div>
        </div>

        {(products?.data?.length as number) > 0 ? (
          products?.data?.map((item) => (
            <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12 w-15 rounded-md flex items-center">
                    <img
                      src={item.image}
                      className="w-16 h-16 object-cover rounded-sm"
                      alt="Product"
                    />
                  </div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {item.name}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm font-medium text-black dark:text-white">
                  {item.category?.name}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-black dark:text-white">
                  {formatRupiah(item?.price as number)}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-black dark:text-white">
                  64
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-meta-3">$247</p>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <p>Loading...</p>
          </div>
        ) : null}
        {/* <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12 w-15 rounded-md">
              <img src="./images/product/product-01.png" alt="Product" />
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              Apple Watch Series 7
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-black dark:text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">$269</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">22</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-meta-3">$45</p>
        </div>
      </div>
      <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12 w-15 rounded-md">
              <img src="./images/product/product-02.png" alt="Product" />
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              Macbook Pro M1
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-black dark:text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">$546</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">34</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-meta-3">$125</p>
        </div>
      </div>
      <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12 w-15 rounded-md">
              <img src="./images/product/product-03.png" alt="Product" />
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              Dell Inspiron 15
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-black dark:text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">$443</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">64</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-meta-3">$247</p>
        </div>
      </div>
      <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12 w-15 rounded-md">
              <img src="./images/product/product-04.png" alt="Product" />
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              HP Probook 450
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-black dark:text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">$499</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-black dark:text-white">72</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-meta-3">$103</p>
        </div>
      </div> */}
      </div>
      {(products?.meta.totalData as number) > 3 && (
        <Pagination
          currentPage={products?.meta.page as number}
          totalItems={products?.meta.totalData as number}
          totalPages={products?.meta.totalPages as number}
          onPageChange={handleChangePage}
        />
      )}
      {/* <Pagination
        currentPage={numb}
        totalItems={1000}
        totalPages={100}
        onPageChange={(page) => setNumb(page)}
      /> */}
    </>
  );
};

export default DataProduct;
