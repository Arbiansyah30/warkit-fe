import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = ({ ...rest }) => {
  return (
    <button
      className="bg-blue-700 w-full p-2 rounded-md text-white font-semibold"
      {...rest}
    >
      Button
    </button>
  );
};

export default Button;
