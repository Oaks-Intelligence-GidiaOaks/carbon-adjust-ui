import { cn } from "@/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { BiCheck } from "react-icons/bi";

const RadioGroupComponent = ({
  options,
  showLabel = true,
  wrapperClassName,
  className,
  showCheckMark,
  value,
  setValue,
  size,
}: {
  options: string[];
  showLabel?: boolean;
  wrapperClassName?: string;
  className?: string;
  showCheckMark?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  size?: string;
}) => (
  <form>
    <RadioGroup.Root
      className="flex flex-col gap-2.5"
      defaultValue="default"
      aria-label="View density"
      value={value}
      onValueChange={setValue}
    >
      {options.map((option, i) => (
        <div className="flex items-center my-2" key={i}>
          <RadioGroup.Item
            key={option}
            className={cn(
              "bg-white w-[25px] border-2 border-black-main h-[25px] rounded-full hover:bg-violet3 outline-none cursor-default",
              size,
              wrapperClassName
            )}
            value={option}
            id={option.toLowerCase()}
          >
            <RadioGroup.Indicator
              className={cn(
                "flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-main",
                className
              )}
            >
              {showCheckMark && (
                <BiCheck className="text-green-500 absolute -top-[1px] -left-[1px]" />
              )}
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          {Boolean(showLabel) && (
            <label
              className="text-black-main font-poppins text-[15px] leading-none pl-[15px]"
              htmlFor={option.toLowerCase()}
            >
              {option}
            </label>
          )}
        </div>
      ))}
    </RadioGroup.Root>
  </form>
);

export default RadioGroupComponent;
