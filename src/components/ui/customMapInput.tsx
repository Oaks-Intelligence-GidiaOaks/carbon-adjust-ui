//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import Input from "./Input";

interface Option {
  id: string;
  name: string;
}

interface CustomMapInputProps {
  value: string;
  label: string;
  inputName: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Option[];
  handleOptionClick?: (option: Option) => void;
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
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const labelStyle = `text-sm font-sm !leading-[23.97px] !text-[#333333] !mb-[10px] capitalize`;
  const inputClassName = `bg-[#E4E7E863] bg-opacity-30 text-xs !font-[400]`;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
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
        onClick={toggleDropdown}
      />

      {/* Dropdown options */}
      {options.length > 0 && isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white z-50 shadow-lg rounded-lg">
          <ul className="max-h-[200px] overflow-y-auto shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleOptionClick?.(option);
                  setIsOpen(false); 
                }}
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
