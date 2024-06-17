import Dashboard from "@pages/Dashboard";
import LoginView from "@pages/Login";
import RegisterView from "@pages/Register";
import AdminView from "@pages/global/Admin";
import AuthView from "@pages/global/Auth";
import Home from "@pages/home";
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
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
