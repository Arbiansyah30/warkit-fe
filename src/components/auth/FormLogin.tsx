import { useAuthLogin } from "@hooks/auth/useAuth";
import { AuthLoginBodyModel } from "@model/auth";
import { useState } from "react";
import Button from "../global/Button";
import Input from "../global/Input";

const InitialValue = {
  email: "",
  password: "",
};

const FormLogin = () => {
  const [authBody, setAuthBody] = useState<AuthLoginBodyModel>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<AuthLoginBodyModel>({ ...InitialValue });

  const mutation = useAuthLogin();

  const validate = () => {
    if (!authBody.email || !authBody.password) {
      const newErrors: AuthLoginBodyModel = { ...InitialValue };

      if (!authBody.email) {
        newErrors.email = "Email is required";
      }
      if (!authBody.password) {
        newErrors.password = "Password is required";
      }
      setErrors(newErrors);
      console.log("err", authBody);
      return false;
    }
    console.log("not err");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync(authBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 w-full"
    >
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          type="email"
          error={!!errors.email}
          placeholder="Email"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        {errors.email && (
          <p className="text-[#DC2626] text-xs">{errors.email}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          type="password"
          error={!!errors.password}
          placeholder="Password"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        {errors.password && (
          <p className="text-[#DC2626] text-xs">{errors.password}</p>
        )}
      </div>

      <Button primary>Submit</Button>
    </form>
  );
};

export default FormLogin;
