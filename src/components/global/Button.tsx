import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children: ReactNode;
  primary?: boolean;
  success?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  primary,
  success,
  danger,
  disabled,
  ...rest
}) => {
  if (success) {
    return (
      <button
        className="bg-[#2EBF44] w-full p-2 rounded-md text-white font-semibold duration-300"
        {...rest}
      >
        {children}
      </button>
    );
  } else if (danger) {
    return (
      <button
        className="bg-[#DC2626] w-full p-2 rounded-md text-white font-semibold duration-300"
        {...rest}
      >
        {children}
      </button>
    );
  } else if (primary) {
    return (
      <button
        className="bg-[#1D4ED8] w-full p-2 rounded-md text-white font-semibold duration-300"
        {...rest}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className="bg-[#aeaeae] w-full p-2 rounded-md text-white font-semibold duration-300"
        {...rest}
      >
        {children}
      </button>
    );
  }
};

export default Button;
