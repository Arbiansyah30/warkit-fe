import Login from "@pages/Login";
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
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
]);
