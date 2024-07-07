import { RootState } from "@/app/store";
import { clearOrder } from "@/features/orderSlice";
import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentSuccessful = (props: {
  setShowCancel: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { product, order } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueOrder = () => {
    // check if package has a schedule
    if (product.hasSchedule) {
      // naviagte to booking calendar page for an order
      navigate(`/dashboard/order-booking/${order._id}`);
    } else {
      navigate(`/dashboard/orders`);
    }

    dispatch(clearOrder());
  };

  const handleCloseModal = () => {
    props.setShowCancel(true);
  };

  return (
    <div className="flex flex-col items-center h-[80vh] w-[368px]">
      <div className="flex-center font-poppins justify-end w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <span onClick={() => handleCloseModal()}>
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
        onClick={() => handleContinueOrder()}
        className="rounded-[12px] mt-[40px] font-poppins w-4/5 mx-auto blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]"
      >
        {product.hasSchedule ? (
          <span>Proceed to schedule booking</span>
        ) : (
          <span>Continue to orders</span>
        )}
      </button>
    </div>
  );
};
export default PaymentSuccessful;
