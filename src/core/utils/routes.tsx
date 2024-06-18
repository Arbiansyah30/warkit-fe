import Dashboard from "@pages/products/DataProducts";
import Login from "@pages/Login";
import AdminView from "@pages/global/Admin";
import AuthView from "@pages/global/Auth";
import Home from "@pages/home";
import { createBrowserRouter } from "react-router-dom";
import Users from "../../container/users";
import ProductsPage from "@pages/products/DataProducts";
import ProductAddPage from "@pages/products/AddProducts";

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
        element: <Login />,
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
        path: "/admin/add-product",
        element: <ProductAddPage />,
      },
    ],
  },
]);
