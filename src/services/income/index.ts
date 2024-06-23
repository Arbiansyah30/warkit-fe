import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { IncomeModel } from "@model/income";

export const incomeService = {
    get: HTTP_REQUEST.get<ApiResponse<IncomeModel>>(API_ENDPOINT.income)
}