import { useAuthRegister } from "@hooks/auth/useAuth";
import { AuthRegisterBodyModel } from "@model/auth";
import { useState } from "react";
import Button from "../global/Button";
import Input from "../global/Input";

const InitialValue = {
  name: "",
  email: "",
  password: "",
};

const FormRegister = () => {
  const [authBody, setAuthBody] = useState<AuthRegisterBodyModel>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<AuthRegisterBodyModel>({
    ...InitialValue,
  });

  const mutation = useAuthRegister();

  const validate = () => {
    if (!authBody.email || !authBody.password || !authBody.name) {
      const newErrors: AuthRegisterBodyModel = { ...InitialValue };

      if (!authBody.email) {
        newErrors.email = "Email is required";
      }
      if (!authBody.password) {
        newErrors.password = "Password is required";
      }
      if (!authBody.name) {
        newErrors.name = "Name is required";
      }
      setErrors(newErrors);
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
      className="flex flex-col items-center gap-6 w-full"
    >
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          type="name"
          name="name"
          error={!authBody.name ? errors.name : ""}
          placeholder="Name"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          type="email"
          name="email"
          error={!authBody.email ? errors.email : ""}
          placeholder="Email"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="w-full flex flex-col gap-1 items-start">
        <Input
          name="password"
          type="password"
          error={!authBody.password ? errors.password : ""}
          placeholder="Password"
          onChange={(e) =>
            setAuthBody((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <Button primary>Submit</Button>
    </form>
  );
};

export default FormRegister;
