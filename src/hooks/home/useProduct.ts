import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import useDebounce from "@hooks/global/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productService } from "../../services/products";

interface Options {
  page?: number;
  perPage?: number;
  categoryId?: string;
  search?: string;
}

export function useProduct(options?: Options) {
  const [searchParams] = useSearchParams();
  const categoryId =
    options?.categoryId || searchParams.get("categoryId") || undefined;
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["products", { categoryId, perPage, page, search }],
    queryFn: () =>
      productService.get({
        queryParams: {
          categoryId,
          name: search,
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
        },
      }),
  });
  return query;
}

export function useProductAdd() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (formData: FormData) => {
      console.log(formData);
      return productService.post(formData, { contentType: "form-data" });
    },
    onSuccess: (res) => {
      alert(res.message);
      navigate("/admin/products")
      return queryClient.removeQueries({ queryKey: ["products"] });
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      alert(err.response?.data.message);
    },
  });
}

export function useProductUpdate() {
  const navigate = useNavigate()
  const { id } = useParams()

  return useMutation({
    mutationFn: (formData: FormData) =>
      productService.put(formData, { contentType: "form-data", path: id }),
    onSuccess: (res) => {
      navigate("/admin/products")
      alert(res.message);
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      alert(err.response?.data.message);
    },
  });
}

export function useProductDelete() {
  const { refetch } = useProduct()

  return useMutation({
    mutationFn: (id: string) => productService.delete({ path: id }),
    onSuccess: () => {
      refetch()
      alert("Product deleted successfully.");
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      alert(err.response?.data.message);
    },
  });
}

export function useProductById() {
  const { id } = useParams()
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById({ path: id }),
    enabled: !!id,
  });
}
