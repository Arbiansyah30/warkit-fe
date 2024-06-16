import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../services/category";

export function useCategory() {
    const query = useQuery({
        queryKey: ['category'],
        queryFn: () => categoryService.get()
    })
    return query
}