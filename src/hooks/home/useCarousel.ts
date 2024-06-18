import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/products";

interface Options {
    page?: number,
    perPage?: number
}

export function useCarousel(options?: Options) {

    const page = options?.page || 1;
    const perPage = options?.perPage || 3;

    const query = useQuery({
        queryKey: ['products', { perPage, page }],
        queryFn: () => productService.get({
            queryParams: {
                page: page ? Number(page) : undefined,
                perPage: perPage ? Number(perPage) : undefined
            }
        })
    })
    return query
}