import { InputHTMLAttributes } from "react";

type Type = "email" | "text" | "password";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: Type;
  name?: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  children,
  name,
  type = "text",
  placeholder,
  ...rest
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        {...rest}
      />
    </div>
  );
};

export default Input;
