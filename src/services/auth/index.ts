import { API_ENDPOINT } from "@core/config/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AuthLoginBodyModel, AuthLoginModel } from "@model/auth";

export const authLogin = {
    login: HTTP_REQUEST.post<ApiResponse<AuthLoginModel>, AuthLoginBodyModel>(API_ENDPOINT.login)
}