import * as React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/utils";
import Label from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  name: Path<any>;
  register?: UseFormRegister<any>;
  required?: boolean;
  prependIcon?: React.ReactNode | string;
  appendIcon?: React.ReactNode | string;
  error?: string;
  inputClassName?: string;
  placeholder?: string;
}

const Input = ({
  className,
  type,
  labelClassName,
  prependIcon,
  appendIcon,
  wrapperClassName,
  register,
  error,
  label,
  inputClassName,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className={cn(wrapperClassName, "group w-full")}>
      {label && (
        <Label
          htmlFor={props.id}
          className={cn(
            `mb-1 block text-[#888888] group-valid:text-[#171717] group-has-[:valid]:text-[#171717]`,
            labelClassName
          )}
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          "gro flex h-[48px] min-w-full items-center overflow-hidden bg-white rounded-md border-none border-input px-3 focus-within:border-[#22C55E]",
          inputClassName
        )}
      >
        {prependIcon}
        <input
          tabIndex={1}
          type={type}
          placeholder={placeholder ? placeholder : ""}
          className={cn(
            "placeholder:text-grey-swatch-600 flex h-[48px] w-full flex-1 bg-transparent py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            prependIcon ? "pl-3" : "",
            className
          )}
          {...(register &&
            register(props.name, {
              ...(props.required && { required: props.required }),
            }))}
          {...props}
        />
        {appendIcon}
      </div>
      {error && <p className="mt-[2px] text-[10px] text-[#E31B23]">{error}</p>}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
