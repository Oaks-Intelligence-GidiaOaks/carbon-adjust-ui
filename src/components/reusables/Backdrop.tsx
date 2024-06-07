import React, { ReactNode } from "react";

const Backdrop = (props: {
  children: ReactNode;
  show: boolean;
  setShow: (v: boolean) => void;
}) => {
  // const closeBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (e.target === e.currentTarget) {
  //     props.setShow(false);
  //   }rder
  // };

  return (
    <div
      className={`  ${
        props.show ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-[#D9D9D9] bg-opacity-70 flex justify-center md:justify-end z-50`}
      // onClick={closeBackdrop}
    >
      <div className="">{props.children}</div>
    </div>
  );
};

export default Backdrop;
