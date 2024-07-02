import { queryClient } from "@core/libs/query/query";
import { router } from "@core/utils/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RouterProvider } from "react-router-dom";
import Loader from "../components/global/Loader";

function App() {
  // console.log(import.meta.env.POS_BASE_URL);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
        {createPortal(<Loader />, document.body)}
      </QueryClientProvider>
    </>
  );
}

export default App;
