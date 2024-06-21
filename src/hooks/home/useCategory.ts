import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { categoryService } from "../../services/category";
import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { CategoryBodyModel } from "@model/category";

interface Options {
    page?: number,
    perPage?: number
}

export function useCategory(options?: Options) {
    const [searchParams] = useSearchParams()
    const page = options?.page || searchParams.get("page") || 1;
    const perPage = options?.perPage || searchParams.get("perPage") || 10;
    const query = useQuery({
        queryKey: ['categories', { page, perPage }],
        queryFn: () => categoryService.get({
            queryParams: {
                perPage: perPage ? Number(perPage) : undefined,
                page: page ? Number(page) : undefined
            }
        })
    })
    return query
}

export function useCategoryAdd() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    return useMutation({
      mutationFn: (body: CategoryBodyModel) => {
        return categoryService.post(body);
      },
      onSuccess: (res) => {
        alert(res.message);
        navigate("/admin/category")
        return queryClient.removeQueries({ queryKey: ["categories"] });
      },
      onError: (err: ApiErrorResponse<ApiResponse>) => {
        alert(err.response?.data.message);
      },
    });
  }


  export function useCategoryUpdate() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { id } = useParams()
    const { refetch } = useCategoryById()
  
    return useMutation({
      mutationFn: (body: CategoryBodyModel) =>
        categoryService.put(body, { path: id }),
      onSuccess: (res) => {
        navigate("/admin/category")
        alert(res.message);
        refetch()
        return queryClient.removeQueries({ queryKey: ["categories"] });
      },
      onError: (err: ApiErrorResponse<ApiResponse>) => {
        alert(err.response?.data.message);
      },
    });
  }

  export function useCategoryDelete() {
    const queryClient = useQueryClient();
    const { refetch } = useCategory()
  
    return useMutation({
      mutationFn: (id: string) => categoryService.delete({ path: id }),
      onSuccess: () => {
        refetch()
        alert("Category deleted successfully.");
        return queryClient.removeQueries({ queryKey: ["categories"] });
      },
      onError: (err: ApiErrorResponse<ApiResponse>) => {
        alert(err.response?.data.message);
      },
    });
  }


  export function useCategoryById() {
    const { id } = useParams()
    return useQuery({
      queryKey: ["category", id],
      queryFn: () => categoryService.getById({ path: id }),
      enabled: !!id,
    });
  }