import React from "react";
import { GrClose } from "react-icons/gr";
import SelectInput from "../ui/SelectInput";
import Backdrop from "./Backdrop";
import { FaChevronDown } from "react-icons/fa";

const ProcessApplicationModal = (props: any) => {
  const Step = (props: { step: string; name: string }) => (
    <div className="flex flex-col gap-3">
      <div className="flex-center gap-4">
        <div className="h-6 w-6 rounded-full bg-[#ECFDF3]" />

        <div className="flex flex-col gap-1">
          <span className="font-[400] text-[#838383]">Step {props.step}</span>
          <span>{props.name}</span>
        </div>
      </div>
    </div>
  );

  const Next = () => (
    <div className="w-fit flex flex-col items-center pl-1">
      <div className="h-2 w-2 rounded-full bg-[#DCDCDC]" />
      <div className="h-6 border-l border-[#DCDCDC]" />
      <FaChevronDown color="#DCDCDC" className="-mt-1" />
    </div>
  );

  return (
    <Backdrop classnames="grid place-items-center px-2" show setShow={() => {}}>
      <div className="flex flex-col  gap-3 border p-10 w-fit rounded-xl bg-white max-w-[440px]">
        {/*  */}
        <div className="flex-center justify-between w-full  border-b pb-2 sticky top-0 z-20 bg-white">
          <h2 className="font-[600] text-lg">Process application</h2>

          <span
            className="cursor-pointer"
            onClick={() => props.setShowcheckout(false)}
          >
            <GrClose />
          </span>
        </div>

        {/*  */}
        <h2 className="text-sm text-[#333333]">
          To process this application, select the order in which you want your
          customers to purchase this product{" "}
        </h2>

        <SelectInput options={[]} onChange={() => {}} />

        {/* steps */}
        <div className="flex flex-col text-xs">
          <Step name="Request Quote" step="1" />
          <Next />
          <Step name="Make Payment" step="2" />
          <Next />
          <Step name="Add next step" step="2" />
        </div>

        <button className="blue-gradient grid place-items-center rounded-lg py-2 text-white text-sm">
          <span>Done</span>
        </button>
      </div>
    </Backdrop>
  );
};

export default ProcessApplicationModal;
