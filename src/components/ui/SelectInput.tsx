import { FC } from "react";
import Select, { ActionMeta, SingleValue, PropsValue } from "react-select";

interface SelectItem {
  value: string;
  label: string;
  key?: string | number;
}

interface SelectInputProps {
  options: SelectItem[];
  disabledCallback?: () => void;
  className?: string;
  value?: PropsValue<SelectItem> | undefined;
  label?: string;
  disabled?: boolean;
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
            container: (provided) => ({
              ...provided,
              height: "45px",
            }),
            control: (provided) => ({
              ...provided,
              height: "45px",
              minHeight: "40px",
              border: "none",
              boxShadow: "none",
              backgroundColor: "#E4E7E8",
              borderRadius: "0.75rem", // equivalent to rounded-xl
              paddingRight: "12px",
              color: "hsl(210,9%,31%) !important",
              outline: "none !important", // Ensure no outline with important
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: "14px",
              fontFamily: "Poppins, sans-serif",
              color: "hsla(210,9%,31%,.7) !important",
            }),
            option: (provided, state) => ({
              ...provided,
              width: "98.5%",
              margin: "0 auto",
              borderRadius:
                state.isFocused || state.isSelected
                  ? "0.25rem !important"
                  : "none",
              fontWeight:
                state.isFocused || state.isSelected
                  ? "400 !important"
                  : "400 !important",
              padding: "11px",
              fontSize: "0.875rem", // 14px
              lineHeight: "21px",
              color:
                state.isFocused || state.isSelected ? "#495057" : "inherit",
              background:
                state.isFocused || state.isSelected ? "#2196F3" : "inherit",
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              height: "40px",
              minHeight: "40px",
              color: state.hasValue ? "hsl(210,9%,31%) !important" : "inherit",
              border: "none",
              outline: "none",
              borderRadius: "0.75rem", // equival
              backgroundColor: state.hasValue ? "inherit" : "#E4E7E8",
            }),
            menuList: (provided, state) => ({
              ...provided,
              background: state.hasValue ? "transparent" : "inherit",
            }),
            menuPortal: (provided) => ({
              ...provided,
              borderRadius: "0.75rem",
            }),
          }}
          classNames={{
            container: (state) =>
              state.isFocused ? "" : "bg-[#E4E7E8] rounded-xl border-none",
            control: (state) =>
              state.isFocused
                ? " !py-[1px] border-none rounded-xl pr-3 bg-[#E4E7E8] shadow-none"
                : " !py-[1px] border-none rounded-xl pr-3 shadow-none",
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
          isDisabled={props.disabled ?? false}
          isLoading={false}
          isClearable={false}
          isSearchable={true}
          value={props.value}
          options={props.options}
          onChange={props.onChange}
          onFocus={() => {
            props.disabledCallback && props.disabledCallback();
          }}
        />
      </div>
    </div>
  );
};

SelectInput.displayName = "SelectInput";
export default SelectInput;
