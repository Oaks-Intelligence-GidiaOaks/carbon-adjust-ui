import { CheckboxProps } from "@/types/general";
import { cn } from "@/utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import * as Checkbox from "@radix-ui/react-checkbox";

const CheckBox = ({
  className,
  id,
  checked,
  setIsChecked,
  customSetIsChecked,
  iconStyle,
  checkIcon,
}: CheckboxProps) => {
  return (
    <Checkbox.Root
      className={cn(
        "hover:bg-blue-200 flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none",
        className
      )}
      checked={checked}
      id={id}
      onClick={() => {
        if (setIsChecked) {
          setIsChecked(!checked);
        }
        if (customSetIsChecked) {
          customSetIsChecked();
        }
      }}
    >
      <Checkbox.Indicator className="text-blue-main">
        {checkIcon ? (
          checkIcon
        ) : (
          <CheckIcon width={14} className={cn("text-blue-main", iconStyle)} />
        )}
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};

export default CheckBox;
