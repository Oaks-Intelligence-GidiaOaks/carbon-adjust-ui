import Select, { ActionMeta, SingleValue, PropsValue } from "react-select";

export type SelectItem = {
  value: string;
  label: string;
  key?: string | number;
};

export type SelectInputProps = {
  options: SelectItem[];
  className?: string;
  value?: PropsValue<SelectItem> | undefined;
  label?: string;
  onChange?: (
    newValue: SingleValue<SelectItem>,
    actionMeta: ActionMeta<SelectItem>
  ) => void;
  placeholder?: string;
};
