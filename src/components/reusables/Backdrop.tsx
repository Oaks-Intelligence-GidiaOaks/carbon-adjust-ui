import { ReactNode } from "react";

const Backdrop = (props: {
  children: ReactNode;
  show: boolean;
  setShow: (v: boolean) => void;
  classnames?: string;
}) => {
  return (
    <div
      className={`  ${
        props.show ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-[#D9D9D9] bg-opacity-70  z-[9999] ${
        props.classnames
      }`}
      // onClick={closeBackdrop}
    >
      <div className="">{props.children}</div>
    </div>
  );
};

export default Backdrop;
