import AuthLayout from "../components/auth/AuthLayout";
import FormLogin from "../components/auth/FormLogin";

const LoginView = () => {
  return (
    <AuthLayout title="Login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginView;
