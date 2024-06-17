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
        className="w-full p-2 outline-none outline outline-solid outline-[#DC2626] outline-offset-[0.5px] rounded-md box-border"
        {...rest}
      />
    );
  }
  return (
    <input
      placeholder={placeholder}
      className="w-full p-2 outline-none focus:outline-2 focus:outline-solid focus:outline-blue-400 focus:outline-offset-[0.5px] rounded-md"
      {...rest}
    />
  );
};

export default Input;
