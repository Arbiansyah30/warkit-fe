import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { TransactionCreationResponse, TransactionModel } from "@model/transaction";

export const transactionService = {
    post: HTTP_REQUEST.post<ApiResponse<TransactionCreationResponse>, TransactionModel>(API_ENDPOINT.transaction),
}