import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { IncomeModel } from "@model/income";
import { PaymentModel, PrintPaymentModel, TransactionCreationResponse, TransactionModel } from "@model/transaction";

interface IncomeNew {
    createdAt: string
    id: string
    nominal: number
    transactionId: string
    updatedAt: string
}

export const transactionService = {
    get: HTTP_REQUEST.get<ApiResponse<TransactionModel[]>>(API_ENDPOINT.transaction),
    post: HTTP_REQUEST.post<ApiResponse<TransactionCreationResponse>, TransactionModel>(API_ENDPOINT.transaction),
    getById: HTTP_REQUEST.get<ApiResponse<TransactionModel>>(API_ENDPOINT.transaction),
    putPayment: HTTP_REQUEST.put<ApiResponse<PaymentModel>>(API_ENDPOINT.payment),
    printPayment: HTTP_REQUEST.post<ApiResponse<PrintPaymentModel>>(API_ENDPOINT.print),
    today: HTTP_REQUEST.get<ApiResponse<TransactionModel[]>>(API_ENDPOINT.transaction + "/now/today"),
    week: HTTP_REQUEST.get<ApiResponse<TransactionModel[]>>(API_ENDPOINT.transaction + "/now/week"),
    month: HTTP_REQUEST.get<ApiResponse<IncomeNew[]>>(API_ENDPOINT.transaction + "/now/month"),
    cancel: HTTP_REQUEST.put<ApiResponse, { transactionId: string }>(API_ENDPOINT.transaction + "/cancel"),
}