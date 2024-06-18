import AuthLayout from "../components/auth/AuthLayout";
import FormRegister from "../components/auth/FormRegister";

const RegisterView = () => {
  return (
    <AuthLayout title="Register">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterView;
