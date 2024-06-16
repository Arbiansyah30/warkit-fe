
import { createBrowserRouter } from "react-router-dom";
import Users from "../../container/users";
import Home from "@pages/home";

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
]);
