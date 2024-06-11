import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";

const OrderSummary = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <div className="flex-center gap-[13px]">
          <IoIosArrowRoundBack />
          <h2 className="font-[600] text-lg">Check Out</h2>
        </div>

        <span onClick={() => props.setShowcheckout(false)}>
          <GrClose />
        </span>
      </div>

      <div className="flex flex-col gap-[22px] border px-5 mx-auto">
        <h2 className="font-[600] text-lg mt-3">Order Summary</h2>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Price $: </span>
          <span className="font-[400] text-sm w-1/2 pl-2"> 199 </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2 "> Package : </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            Window Retrofitting{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Address: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            45 Forth Avenue, Bristol, United Kingdom
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Email Address: </span>
          <span className="font-[400] text-sm  truncate w-1/2 pl-2">
            demoperson@gmail.com
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Phone Number: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {" "}
            +44 4576 87*****{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">
            Will you need any other product?:
          </span>
          <span className="font-[400] text-sm w-1/2 pl-2"> Yes </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">
            How much are you willing to spend on your retrofit journey in the
            next year?:
          </span>
          <span className="font-[400] text-sm w-1/2 pl-2"> $25 </span>
        </div>

        <button
          onClick={() => props.setStage(4)}
          className="rounded-[12px] mt-[40px] font-poppins w-full blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]"
        >
          <span>Proceed to pay</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
