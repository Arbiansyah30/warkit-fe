import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { categoryService } from "../../services/category";

interface Options {
    page?: number,
    perPage?: number
}

export function useCategory(options?: Options) {
    const [searchParams] = useSearchParams()
    const page = options?.page || searchParams.get("page") || 1;
    const perPage = options?.perPage || searchParams.get("perPage") || 10;
    const query = useQuery({
        queryKey: ['category', { page, perPage }],
        queryFn: () => categoryService.get({
            queryParams: {
                perPage: perPage ? Number(perPage) : undefined,
                page: page ? Number(page) : undefined
            }
        })
    })
    return query
}