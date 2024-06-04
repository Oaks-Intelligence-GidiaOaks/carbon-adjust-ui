import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { cn } from "@/utils";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { Button } from "../ui";
import { IoMdClose } from "react-icons/io";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const FlyoutSidebar = ({ isOpen, onOpenChange, children }: Props) => {
  const myRef = useRef<HTMLDivElement>(null);

  useOutsideCloser(myRef, isOpen, onOpenChange);

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-950/40 z-30 pointer-events-auto">
      <div
        ref={myRef}
        className={cn(
          "max-w-[584px] min-w-[284px] w-full absolute right-0 top-0 bg-white h-screen overflow-y-scroll transition-all",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Button
          onClick={() => onOpenChange(false)}
          variant={"outline"}
          className="size-8 p-0 rounded-full absolute top-4 right-4 text-blue-main border border-blue-main"
        >
          <IoMdClose size={18} />
        </Button>
        <div className="mt-16">{children}</div>
      </div>
    </div>
  ) : null;
};

export default FlyoutSidebar;
