import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { CategoryDTO } from "@model/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { categoryService } from "../../services/category";

interface Options {
  page?: number,
  perPage?: number
}

type PayloadType = 'create' | 'update' | 'delete'

interface CategoryCreation {
  type: PayloadType
  data: CategoryDTO
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

export function useCategoryCreation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async ({ data, type }: CategoryCreation) => {
      switch (type) {
        case 'create':
          return categoryService.post(data)
        case 'update':
          return categoryService.put(data, { path: data.id })
        case 'delete':
          return categoryService.delete({ path: data.id })
        default:
          return categoryService.post(data)
      }
    },
    onSuccess: (res) => {
      alert(res.message)
      navigate('/admin/category')
      return queryClient.removeQueries({ queryKey: ['categories'] })
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      alert(err.response?.data.message)
    }
  })
  return mutation
}

export function useCategoryById() {
  const { id } = useParams()
  return useQuery({
    queryKey: ["categoryById", id],
    queryFn: () => categoryService.getById({ path: id }),
    enabled: !!id,
  });
}
