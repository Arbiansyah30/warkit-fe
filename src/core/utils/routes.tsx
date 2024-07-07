import LoginView from "@pages/Login";
import RegisterView from "@pages/Register";
import AddCategoryPage from "@pages/category/AddCategory";
import DataCategoryPage from "@pages/category/DataCategory";
import UpdateCategoryPage from "@pages/category/UpdateCategory";
import DashboardView from "@pages/dashboard/Dashboard";
import AdminView from "@pages/global/Admin";
import AuthView from "@pages/global/Auth";
import Home from "@pages/home";
import IncomeView from "@pages/income/IncomeView";
import DataOrderPage from "@pages/order/DataOrder";
import DetailOrderPage from "@pages/order/DetailOrder";
import AddProductPage from "@pages/products/AddProducts";
import DataProductsPage from "@pages/products/DataProducts";
import UpdateProductsPage from "@pages/products/UpdateProducts";
import { createBrowserRouter } from "react-router-dom";
import Users from "../../container/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthView />,
    children: [
      {
        path: "/admin/login",
        element: <LoginView />,
      },
      {
        path: "/admin/register",
        element: <RegisterView />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminView />,
    children: [
      {
        path: "/admin/product",
        element: <DataProductsPage />,
      },
      {
        path: "/admin/product/add",
        element: <AddProductPage />,
      },
      {
        path: "/admin/product/edit/:id",
        element: <UpdateProductsPage />,
      },
      {
        path: "/admin/category",
        element: <DataCategoryPage />,
      },
      {
        path: "/admin/category/add",
        element: <AddCategoryPage />,
      },
      {
        path: "/admin/category/edit/:id",
        element: <UpdateCategoryPage />,
      },
      {
        path: "/admin/transaction",
        element: <DataOrderPage />,
      },
      {
        path: "/admin/transaction/:id",
        element: <DetailOrderPage />,
      },
      {
        path: "/admin/income",
        element: <IncomeView />,
      },
      {
        path: "/admin/dashboard",
        element: <DashboardView />,
      },
    ],
  },
]);
