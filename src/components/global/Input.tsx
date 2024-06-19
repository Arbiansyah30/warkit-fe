import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name?: string;
  children?: React.ReactNode;
  error?: boolean;
  sizes?: "sm" | "md";
}

const Input: React.FC<InputProps> = ({
  children,
  name,
  error,
  placeholder,
  sizes = "md",
  ...rest
}) => {
  if (error) {
    return (
      <input
        placeholder={placeholder}
        className={
          sizes === "md"
            ? "w-full p-2 border border-solid border-[#DC2626] rounded-md box-border"
            : "w-full p-2 border border-solid border-[#DC2626] rounded-md box-border h-[40px]"
        }
        {...rest}
      />
    );
  }
  return (
    <input
      placeholder={placeholder}
      className={
        sizes === "md"
          ? "w-full p-2 border border-solid border-gray-400 focus:border focus:border-solid focus:border-blue-400 rounded-md"
          : "w-full p-2 border border-solid border-gray-400 focus:border focus:border-solid focus:border-blue-400 rounded-md h-[40px]"
      }
      {...rest}
    />
  );
};

export default Input;
