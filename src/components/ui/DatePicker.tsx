import { useState } from "react";
import DatePicker from "react-date-picker";
import { cn } from "@/utils";
import Label from "./Label";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  //   name: Path<any>;
  //   register?: UseFormRegister<any>;
  required?: boolean;
  prependIcon?: React.ReactNode | string;
  appendIcon?: React.ReactNode | string;
  error?: string;
  inputClassName?: string;
  placeholder?: string;
  dateValue?: string;
  onDateChange: (value: Value) => void;
}

const Datepicker = ({
  type,
  labelClassName,
  prependIcon,
  appendIcon,
  wrapperClassName,
  // register,
  error,
  label,
  inputClassName,
  placeholder,
  onDateChange,
  dateValue,
  ...props
}: //   className,

InputProps) => {
  const [] = useState<Value>(new Date());

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
          "flex h-[48px] min-w-full items-center bg-white rounded-md border-none border-input px-3 focus-within:border-[#22C55E]",
          inputClassName
        )}
      >
        {/* {prependIcon} */}
        {/* <input
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
        /> */}

        <DatePicker
          onChange={(value) => onDateChange(value)}
          value={dateValue}
          className={cn("w-full px-[0px_!important] border-none")}
          calendarClassName={cn(
            "font-manrope rounded-lg border-[0_!important] shadow-lg overflow-hidden"
          )}
          tileClassName={cn("font-sans text-[white_!important] rounded-md")}
          clearIcon={false}
          maxDate={new Date()}
        />
        {/* {appendIcon} */}
      </div>
      {error && <p className="mt-[2px] text-[10px] text-[#E31B23]">{error}</p>}
    </div>
  );
};

Datepicker.displayName = "Input";

export default Datepicker;
