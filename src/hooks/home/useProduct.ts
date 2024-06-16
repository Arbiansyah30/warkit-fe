import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/products";

export function useProduct() {
    const [searchParams] = useSearchParams()
    const categoryId = searchParams.get("categoryId") || undefined
    const query = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => productService.get({ path: categoryId ? `?categoryId=${categoryId}` : undefined })
    })
    return query
}