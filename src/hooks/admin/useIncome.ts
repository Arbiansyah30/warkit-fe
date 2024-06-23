import { useQuery } from "@tanstack/react-query";
import { incomeService } from "../../services/income";

export function useIncome() {
    const query = useQuery({
        queryKey: ['income'],
        queryFn: () => incomeService.get()
    })
    return query
}