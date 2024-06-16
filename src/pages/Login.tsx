import FormLogin from "../components/auth/FormLogin";

const Login = () => {
  return (
    <div className="flex flex-col w-full px-10 gap-5">
      <h1 className="text-4xl font-bold">LOGIN</h1>
      <FormLogin />
    </div>
  );
};

export default Login;
