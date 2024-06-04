import * as React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/utils";
import Label from "./Label";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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

const TextArea = ({
  className,
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
}: TextAreaProps) => {
  return (
    <div className={cn(wrapperClassName, "group w-full")}>
      {label && (
        <Label
          htmlFor={props.id}
          className={`mb-1 block ${labelClassName} text-[#888888] group-valid:text-[#171717] group-has-[:valid]:text-[#171717]`}
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          "gro flex min-w-full items-center overflow-hidden bg-white rounded-md border-none border-input px-3 focus-within:border-[#22C55E]",
          inputClassName
        )}
      >
        {prependIcon}
        <textarea
          tabIndex={1}
          placeholder={placeholder ? placeholder : ""}
          className={cn(
            "placeholder:text-grey-swatch-600 flex w-full flex-1 bg-transparent py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

TextArea.displayName = "Input";

export default TextArea;
