import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { CategoryDTO } from "@model/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { categoryService } from "../../services/category";
import { loadingBarAtom } from "../../store/loadingBar";

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
  const setLoading = useSetAtom(loadingBarAtom)
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
      setLoading(false)
      toast.success(res.message as string)
      navigate('/admin/category')

      queryClient.removeQueries({ queryKey: ['categories'] })
      queryClient.removeQueries({ queryKey: ['categoryById'] })
      return
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      setLoading(false)
      toast.error(err.response?.data.message as string)
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

export function useCategoryFilter() {
  return useQuery({
    queryKey: ["categoryFilter"],
    queryFn: () => categoryService.get({
      queryParams: {
        perPage: 1000,
        page: 1
      }
    })
  })
}