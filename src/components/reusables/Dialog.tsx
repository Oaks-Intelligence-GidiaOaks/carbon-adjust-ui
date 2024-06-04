import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
const DialogComponent = ({
  isOpen,
  children,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}) => (
  <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="bg-grey-swatch-110/30 data-[state=open]:animate-contentShow backdrop-blur-sm fixed top-[50%] left-[50%] h-screen w-full translate-x-[-50%] translate-y-[-50%] z-[10000000] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex justify-center overflow-y-scroll">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogComponent;
