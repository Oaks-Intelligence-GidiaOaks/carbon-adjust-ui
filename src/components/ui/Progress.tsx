import { cn } from "@/utils";
import * as Progress from "@radix-ui/react-progress";
import { useState } from "react";

type Props = {
  percentage: number;
  wrapperClassName?: string;
  contentClassName?: string;
};

const ProgressDemo = ({
  percentage,
  wrapperClassName,
  contentClassName,
}: Props) => {
  const [progress] = useState(percentage);

  return (
    <Progress.Root
      className={cn(
        "relative overflow-hidden bg-blackA6 rounded-full h-[25px]",
        wrapperClassName
      )}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className={cn(
          "bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]",
          contentClassName
        )}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressDemo;
