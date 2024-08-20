import { ReactNode } from "react";

const Modal = (props: { children: ReactNode }) => {
  return (
    <div className="fixed z-[10000000] overflow-hidden inset-0 bg-gray-500/20 backdrop-blur-sm flex justify-center items-center">
      {props.children}
    </div>
  );
};

export default Modal;
