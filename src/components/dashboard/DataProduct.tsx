const DataProduct = () => {
  return (
    <div className="rounded-sm border bg-gray-900 text-white">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-xl font-bold text-white">
          Data Products
        </h4>
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

      <div className="grid grid-cols-6 border-t px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12 w-15 rounded-md">
              <img src="./images/product/product-01.png" alt="Product" />
            </div>
            <p className="text-sm font-medium text-white">
              Apple Watch Series 7
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">$269</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">22</p>
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
            <p className="text-sm font-medium text-white">
              Macbook Pro M1
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">$546</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">34</p>
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
            <p className="text-sm font-medium text-white">
              Dell Inspiron 15
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">$443</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">64</p>
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
            <p className="text-sm font-medium text-white">
              HP Probook 450
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium text-white">
            Electronics
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">$499</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-white">72</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium text-meta-3">$103</p>
        </div>
      </div>
    </div>
  );
};

export default DataProduct;
