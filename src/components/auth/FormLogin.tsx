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
  const [authBody, setAuthBody] = useState<AuthLoginBodyModel>(InitialValue);

  const mutation = useAuthLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authBody);
    await mutation.mutateAsync(authBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 w-full"
    >
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setAuthBody((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setAuthBody((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <Button>Submit</Button>
    </form>
  );
};

export default FormLogin;