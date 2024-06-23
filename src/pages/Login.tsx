import AuthLayout from "../components/auth/AuthLayout";
import FormLogin from "../components/auth/FormLogin";

const LoginView = () => {
  return (
    <AuthLayout auth="Login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginView;
