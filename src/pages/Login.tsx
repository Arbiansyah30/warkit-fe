import FormLogin from "../components/auth/FormLogin";

const LoginView = () => {
  return (
    <div className="flex flex-col w-full px-5 py-10 rounded-md bg-gray-900 text-white gap-10">
      <div className="gap-3 flex flex-col text-center">
        <div className="text-5xl font-bold">Logo</div>
        <div>
          <h4 className="text-2xl font-semibold">LOGIN</h4>
          <FormLogin />
          <p className="text-sm -mt-1">Masuk ke akun anda</p>
        </div>
      </div>
      {/* </AuthLayout> */}
    </div>
  );
};

export default LoginView;
