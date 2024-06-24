import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { incomeService } from "../../services/income";

export function useIncome() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    const query = useQuery({
        queryKey: ['income', { from, to }],
        queryFn: () => incomeService.get({
            queryParams: {
                from,
                to
            }
        })
    })
    return query
}