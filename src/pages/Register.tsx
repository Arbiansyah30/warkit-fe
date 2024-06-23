import AuthLayout from "../components/auth/AuthLayout";
import FormRegister from "../components/auth/FormRegister";

const RegisterView = () => {
  return (
    <AuthLayout auth="Register">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterView;
