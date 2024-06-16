import { AuthLoginBodyModel } from "@model/auth";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../../services/auth";

export function useAuthLogin() {
    const mutation = useMutation({
        mutationFn: (body: AuthLoginBodyModel) => authLogin.login(body),
        onSuccess: (res) => {
            console.log(res.data?.accessToken)
            alert(res.message)
        },
        onError: (err) => alert(err.message)
    })
    return mutation
}