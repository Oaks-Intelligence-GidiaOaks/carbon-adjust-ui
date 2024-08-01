import { cn } from "@/utils";
import * as Switch from "@radix-ui/react-switch";

const SwitchButton = ({
  value,
  onCheckedChange,
  disabled = false,
}: {
  value: boolean;
  onCheckedChange: (val: boolean) => void;
  disabled?: boolean;
}) => (
  <Switch.Root
    disabled={disabled}
    checked={value}
    onCheckedChange={onCheckedChange}
    className={cn(
      "w-[42px] h-[25px] bg-gray-300 border border-gray-300 rounded-full relative shadow-none focus:shadow-none data-[state=checked]:bg-ca-blue outline-none outline-offset-0 outline-transparent cursor-default",
      disabled && "opacity-50"
    )}
    id="airplane-mode"
    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
  >
    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
  </Switch.Root>
);

export default SwitchButton;
