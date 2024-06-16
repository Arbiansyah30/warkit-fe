import { InputHTMLAttributes } from "react";

type Type = "email" | "text" | "password";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: Type;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 outline-none focus:outline-2 focus:outline-solid focus:outline-blue-400 rounded-md"
      {...rest}
    />
  );
};

export default Input;
