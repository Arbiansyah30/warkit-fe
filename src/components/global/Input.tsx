import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name?: string;
  children?: React.ReactNode;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  children,
  name,
  error,
  placeholder,
  ...rest
}) => {
  if (error) {
    return (
      <input
        placeholder={placeholder}
        className="w-full p-2 border border-solid border-[#DC2626] rounded-md box-border"
        {...rest}
      />
    );
  }
  return (
    <input
      placeholder={placeholder}
      className="w-full p-2 border border-solid border-gray-400 focus:border focus:border-solid focus:border-blue-400 rounded-md"
      {...rest}
    />
  );
};

export default Input;
