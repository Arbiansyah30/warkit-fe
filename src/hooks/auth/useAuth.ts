import { AuthLoginBodyModel } from "@model/auth";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../../services/auth";

export function useAuthLogin() {
    const mutation = useMutation({
        mutationFn: (body: AuthLoginBodyModel) => authLogin.login(body),
        onSuccess: (res) => {
            localStorage.setItem("token", res?.data?.accessToken as string)
            alert(res.message)
        },
        onError: (err) => alert(err.message)
    })
    return mutation
}