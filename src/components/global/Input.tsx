import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  error,
  placeholder,
  ...rest
}) => {
  if (error) {
    return (
      <input
        placeholder={placeholder}
        className="w-full p-2 outline-none outline outline-solid outline-[#DC2626] rounded-md box-border"
        {...rest}
      />
    );
  }
  return (
    <input
      placeholder={placeholder}
      className="w-full p-2 outline-none focus:outline-2 focus:outline-solid focus:outline-blue-400 rounded-md"
      {...rest}
    />
  );
};

export default Input;
