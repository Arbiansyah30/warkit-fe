import { queryClient } from "@core/libs/query/query";
import { router } from "@core/utils/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RouterProvider } from "react-router-dom";

function App() {
  // console.log(import.meta.env.POS_BASE_URL);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
