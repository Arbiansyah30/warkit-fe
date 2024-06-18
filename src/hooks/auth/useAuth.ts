import { AuthLoginBodyModel, AuthRegisterBodyModel } from "@model/auth";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth";

export function useAuthLogin() {
    const mutation = useMutation({
        mutationFn: (body: AuthLoginBodyModel) => authService.login(body),
        onSuccess: (res) => {
            localStorage.setItem("token", res?.data?.accessToken as string)
            alert(res.message)
        },
        onError: (err) => alert(err.message)
    })
    return mutation
}

export function useAuthRegister() {
    const mutation = useMutation({
        mutationFn: (body: AuthRegisterBodyModel) => authService.register(body),
        onSuccess: (res) => alert(res.message),
        onError: (err) => alert(err.message)
    })
    return mutation
}