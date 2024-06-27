import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children?: React.ReactNode;
  error?: string;
  isLoading?: boolean;
  showBackground?: boolean;
  isFile?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  children,
  error,
  isLoading,
  showBackground = false,
  isFile = false,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {children}
      </label>

      {isFile ? (
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
      ) : (
        <input
          name={name}
          className={`w-full rounded border ${
            showBackground ? "bg-[#F9FAFB]" : "bg-transparent"
          } px-3 py-2 font-normal outline-none transition ${
            error
              ? "focus:border-[#DC2626] active:border-[#DC2626]"
              : "focus:border-[#1D4ED8] active:border-[#1D4ED8]"
          } ${error ? "border-red-500" : "border-stroke"} ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
          {...rest}
        />
      )}
      {error ? <p className="text-[#DC2626] text-xs">{error}</p> : null}
    </div>
  );
};

export default Input;
