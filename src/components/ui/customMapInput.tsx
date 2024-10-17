import React from "react";
import Input from "./Input";

interface Option {
  id: string;
  name: string;
}

interface CustomMapInputProps {
  value: string;
  label: string;
  inputName: string;
  isShow: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Option[];
  handleOptionClick?: (id: string) => void;
  icon?: React.ReactNode | string;
}

const CustomMapInput: React.FC<CustomMapInputProps> = ({
  value,
  onChange,
  options = [],
  handleOptionClick,
  label,
  inputName,
  icon,
  isShow,
  ...props
}) => {
  const labelStyle = `text-sm font-sm !leading-[23.97px] !text-[#333333] !mb-[10px] capitalize`;
  const inputClassName = `bg-[#E4E7E863] bg-opacity-30 text-xs !font-[400]  `;
  return (
    <div className="relative w-full">
      {/* Input field */}
      <Input
        {...props}
        name={inputName}
        label={label}
        inputClassName={inputClassName}
        labelClassName={`${labelStyle} font-medium !text-lg`}
        prependIcon={icon}
        value={value}
        onChange={onChange}
        required
      />

      {/* Dropdown options */}
      {options.length > 0 && isShow && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white z-50 shadow-lg rounded-lg">
          <ul className="max-h-[200px] overflow-y-auto shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.address.freeformAddress}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomMapInput;
