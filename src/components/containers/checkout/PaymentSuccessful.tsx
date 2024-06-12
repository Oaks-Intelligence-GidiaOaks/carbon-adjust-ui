import { clearOrder } from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";

const PaymentSuccessful = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center h-[80vh]">
      <div className="flex-center font-poppins justify-end w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <span
          onClick={() => {
            dispatch(clearProduct());
            dispatch(clearOrder());
            props.setShowcheckout(false);
          }}
        >
          <GrClose />
        </span>
      </div>

      <div className="my-auto flex flex-col items-center gap-[14px] ">
        <h2 className="font-[600] text-base">Payment Successful</h2>

        <img
          src="/assets/icons/tick-circle.svg"
          className="h-[150px] w-[150px]"
          alt=""
        />
      </div>

      <button
        onClick={() => props.setStage(1)}
        className="rounded-[12px] mt-[40px] font-poppins w-4/5 mx-auto blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]"
      >
        <span>Continue</span>
      </button>
    </div>
  );
};
export default PaymentSuccessful;
