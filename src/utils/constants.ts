import { SelectItem } from "@/types/formSelect";
import {
  CSSObjectWithLabel,
  GroupBase,
  MenuListProps,
  OptionProps,
} from "react-select";

export const customStyles = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "45px",
  }),
  control: (provided: CSSObjectWithLabel) => ({
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
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    color: "hsla(210,9%,31%,.7) !important",
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    width: "98.5%",
    margin: "0 auto",
    borderRadius: state.isFocused || state.isSelected ? "0.25rem" : "none",
    fontWeight:
      state.isFocused || state.isSelected ? "400 !important" : "400 !important",
    padding: "11px",
    fontSize: "0.875rem", // 14px
    lineHeight: "21px",
    color: state.isFocused || state.isSelected ? "white" : "inherit",
    background: state.isFocused || state.isSelected ? "#2196F3" : "inherit",
  }),
  valueContainer: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    height: "40px",
    minHeight: "40px",
    color: state.hasValue ? "hsl(210,9%,31%) !important" : "inherit",
    border: "none",
    outline: "none",
    borderRadius: "0.75rem", // equival
    backgroundColor: state.hasValue ? "inherit" : "#E4E7E8",
  }),
  menuList: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    background: state.hasValue ? "transparent" : "inherit",
    borderRadius: "0.75rem",
  }),
  menuPortal: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    background: state.hasValue ? "transparent" : "inherit",
    borderRadius: "0.75rem",
  }),
};
