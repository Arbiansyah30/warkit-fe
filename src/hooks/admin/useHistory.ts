import { ApiResponse } from "@core/libs/api/types";
import { HistoryModel } from "@model/history";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { transactionService } from "../../services/transaction";

export function useHistory() {
    const { id } = useParams()
    const query = useQuery({
        queryKey: ['history', id],
        queryFn: () => transactionService.get({ path: `history/${id}` })
    })
    return { ...query, data: query?.data as unknown as ApiResponse<HistoryModel[]> }
}