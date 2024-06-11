import { GrClose } from "react-icons/gr";
import Backdrop from "./Backdrop";

const RejectApplicationModal = () => {
  return (
    <Backdrop setShow={() => {}} show classnames="grid place-items-center px-2">
      <div className=" font-poppins flex flex-col  gap-3 border p-10 w-fit rounded-xl bg-white max-w-[440px]">
        <div className="flex-center justify-between w-full  border-b pb-2 sticky top-0 z-20 bg-white">
          <h2 className="font-[600] text-lg">Reject application</h2>

          <span className="cursor-pointer" onClick={() => {}}>
            <GrClose />
          </span>
        </div>

        <div className="text-sm flex flex-col gap-1 font-[400]">
          <h2 className=" text-[#333333] font-[400]">
            Are you sure you want to reject this application?
          </h2>

          <h2 className="text-[#838383]">
            Tell us why you want to reject this application. N.B: This optional
          </h2>
        </div>

        <textarea
          name=""
          id=""
          rows={6}
          className="border border-[#0E89F7] rounded-lg text-sm p-2"
        ></textarea>

        <div className="flex-center w-full justify-center gap-3">
          <button className={" p-3 flex-1 min-w-[40px] py-2 rounded-lg border"}>
            <span>Cancel</span>
          </button>

          <button className="p-3 flex-1 min-w-[40px] text-white blue-gradient py-2 rounded-lg">
            <span>Done</span>
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default RejectApplicationModal;
