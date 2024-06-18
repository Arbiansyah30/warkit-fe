import useDebounce from "@hooks/global/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/products";

interface Options {
    page?: number,
    perPage?: number,
    categoryId?: string,
    search?: string,
}

export function useProduct(options?: Options) {

    const [searchParams] = useSearchParams()
    const categoryId = options?.categoryId || searchParams.get("categoryId") || undefined;
    const page = options?.page || searchParams.get("page") || 1;
    const perPage = options?.perPage || searchParams.get("perPage") || 10;
    const searchQuery = options?.search || searchParams.get("search") || undefined;
    const search = useDebounce(searchQuery as string, 500)

    const query = useQuery({
        queryKey: ['products', { categoryId, perPage, page, search }],
        queryFn: () => productService.get({
            queryParams: {
                categoryId,
                name: search,
                page: page ? Number(page) : undefined,
                perPage: perPage ? Number(perPage) : undefined
            }
        })
    })
    return query
}