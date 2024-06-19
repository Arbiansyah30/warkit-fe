import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children: ReactNode;
  primary?: boolean;
  success?: boolean;
  danger?: boolean;
  disabled?: boolean;
  sizes?: "sm" | "md";
}

const Button: React.FC<IButtonProps> = ({
  children,
  primary,
  success,
  danger,
  disabled,
  sizes = "md",
  ...rest
}) => {
  if (success) {
    return (
      <button
        className={
          sizes === "md"
            ? "bg-[#2EBF44] w-full p-2 rounded-md text-white font-semibold duration-300"
            : "bg-[#2EBF44] w-full p-2 rounded-md text-white font-medium duration-300 text-xs"
        }
        {...rest}
      >
        {children}
      </button>
    );
  } else if (danger) {
    return (
      <button
        className={
          sizes === "md"
            ? "bg-[#DC2626] w-full p-2 rounded-md text-white font-semibold duration-300"
            : "bg-[#DC2626] w-full p-2 rounded-md text-white font-medium duration-300 text-xs"
        }
        {...rest}
      >
        {children}
      </button>
    );
  } else if (primary) {
    return (
      <button
        className={
          sizes === "md"
            ? "bg-[#1D4ED8] w-full p-2 rounded-md text-white font-semibold duration-300"
            : "bg-[#1D4ED8] w-full p-2 rounded-md text-white font-medium duration-300 text-xs"
        }
        {...rest}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className={
          sizes === "md"
            ? "bg-[#aeaeae] w-full p-2 rounded-md text-white font-semibold duration-300"
            : "bg-[#aeaeae] w-full p-2 rounded-md text-white font-medium duration-300 text-xs"
        }
        {...rest}
      >
        {children}
      </button>
    );
  }
};

export default Button;
