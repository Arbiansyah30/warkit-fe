import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { AuthLoginBodyModel, AuthRegisterBodyModel } from "@model/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth";

export function useAuthLogin() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (body: AuthLoginBodyModel) => authService.login(body),
        onSuccess: (res) => {
            localStorage.setItem("token", res?.data?.accessToken as string)
            alert(res.message)
            navigate("/admin/product")
        },
        onError: (err: ApiErrorResponse<ApiResponse>) => alert(err.response?.data.message)
    })
    return mutation
}

export function useAuthRegister() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (body: AuthRegisterBodyModel) => authService.register(body),
        onSuccess: (res) => {
            alert(res.message)
            navigate("/admin/login")
        },
        onError: (err: ApiErrorResponse<ApiResponse>) => alert(err.response?.data.message)
    })
    return mutation
}


export function useAuth() {
    const token = localStorage.getItem("token") || ""

    if (token) {
        return { token }
    }
    return null
}