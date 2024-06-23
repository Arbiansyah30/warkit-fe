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
      return false;
    }
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
          name="email"
          type="email"
          error={errors.email}
          placeholder="Enter your email"
          value={authBody.email}
          autoComplete="off"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, email: e.target.value }))
          }
        >
          Email
        </Input>
      </div>
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          name="password"
          type="password"
          error={errors.password}
          placeholder="*****"
          value={authBody.password}
          autoComplete="off"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, password: e.target.value }))
          }
        >
          Password
        </Input>
      </div>

      <Button primary>Submit</Button>
    </form>
  );
};

export default FormLogin;
