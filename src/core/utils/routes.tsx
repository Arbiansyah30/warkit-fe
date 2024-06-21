import LoginView from "@pages/Login";
import RegisterView from "@pages/Register";
import AdminView from "@pages/global/Admin";
import AuthView from "@pages/global/Auth";
import Home from "@pages/home";
import AddProductPage from "@pages/products/AddProducts";
import ProductsPage from "@pages/products/DataProducts";
import { createBrowserRouter } from "react-router-dom";
import Users from "../../container/users";
import UpdateProductsPage from "@pages/products/UpdateProducts";
import DataCategoryPage from "@pages/category/DataCategory";
import AddCategoryPage from "@pages/category/AddCategory";
import UpdateCategoryPage from "@pages/category/UpdateCategory";

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
        path: "/admin/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/products/add",
        element: <AddProductPage />,
      },
      {
        path: "/admin/products/edit/:id",
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
    ],
  },
]);
