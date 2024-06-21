import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types"
import { TransactionModel } from "@model/transaction"
import { useMutation } from "@tanstack/react-query"
import { transactionService } from "../../services/transaction"

type PayloadType = 'create' | 'update'

interface Payload {
    type: PayloadType
    data: TransactionModel
}

export const useTransactionCreation = () => {
    const mutation = useMutation({
        mutationFn: ({ data, type }: Payload) => {
            if (type === 'create') {
                return transactionService.post(data)
            }
            return transactionService.post(data)
        },
        onSuccess: (res) => {
            if (res.data?.redirect_url) {
                window.location.href = res.data?.redirect_url
                return
            }
            alert(res.message)
            window.location.reload()
        },
        onError: (err: ApiErrorResponse<ApiResponse>) => alert(err.response?.data.message)

    })
    return mutation
}