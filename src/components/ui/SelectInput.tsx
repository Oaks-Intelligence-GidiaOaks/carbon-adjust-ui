import { FC } from "react";
import Select, { ActionMeta, SingleValue, PropsValue } from "react-select";

interface SelectItem {
  value: string;
  label: string;
  key?: string | number;
}

interface SelectInputProps {
  options: SelectItem[];
  className?: string;
  value?: PropsValue<SelectItem> | undefined;
  label?: string;
  onChange?: (
    newValue: SingleValue<SelectItem>,
    actionMeta: ActionMeta<SelectItem>
  ) => void;
  placeholder?: string;
}

const SelectInput: FC<SelectInputProps> = (props) => {
  return (
    <div
      data-testid="select-input-container"
      className={`${props.className} w-full space-y-[10px]`}
    >
      {props.label && (
        <label
          htmlFor={props.label}
          className="font-[400] text-sm text-[#333333]"
        >
          {props.label}
        </label>
      )}

      <div className="">
        <Select
          id="Form-Select"
          styles={{
            placeholder: (provided, _) => ({
              ...provided,
              fontSize: "14px",
              fontFamily: "Plus Jakarta Sans', sans-serif",
            }),
          }}
          classNames={{
            container: (state) =>
              state.isFocused ? "" : "bg-[#E4E7E8] rounded-lg border-none",
            control: (state) =>
              state.isFocused
                ? " !py-[1px] border-none rounded-lg pr-3 bg-[#E4E7E8] shadow-none"
                : " !py-[1px] border-[0_!important] rounded-lg pr-3 shadow-none",
            option: (state) =>
              state.isFocused || state.isSelected
                ? " custom-option-gradient !rounded-[10px] !font-[600] !py-[11px] !text-sm !leading-[21px] !text-white !w-[98.5%] !mx-auto"
                : " !w-[98.5%] !mx-auto",
            valueContainer: (state) =>
              state.hasValue
                ? " !border-none !outline-none !text-[#8a8a8a]"
                : "bg-[#E4E7E8] border-none",
            menuList: (state) => (state.hasValue ? " !bg-transparent" : ""),
          }}
          name={props.label}
          placeholder={props.placeholder}
          aria-label={props.label}
          data-testid="select-control"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isSearchable={true}
          value={props.value}
          options={props.options}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

SelectInput.displayName = "SelectInput";
export default SelectInput;
