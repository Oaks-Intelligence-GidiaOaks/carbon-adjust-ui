import { RootState } from "@/app/store";

import { updateOrderPaymentStatus } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, memo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { Oval } from "react-loader-spinner";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ProcessingPayment = (props: {
  setShowCancel: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { order } = useSelector((state: RootState) => state);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const loadingToastId = toast.loading("Processing payment...", {
    duration: 1500, // Display for 3 seconds
  });

  const updateOrderStatus = useMutation({
    mutationKey: ["update-order-status"],
    mutationFn: (orderId: string) => updateOrderPaymentStatus(orderId),
    onSuccess: (_: any) => {
      // console.log(sx, "success ");
      toast.dismiss(loadingToastId);
      props.setStage(5);
    },
    onError: (_: any) => {
      toast.error("Updating order failed. Please try again.");
      toast.dismiss(loadingToastId);
    },
  });

  // const handleContinue = () => {
  //   navigate(`/dashboard/order-booking/${order._id}`);
  // };

  const retryOrderUpdate = () => {
    updateOrderStatus.mutate(order._id!);
  };

  useEffect(() => {
    if (order._id) {
      updateOrderStatus.mutate(order._id);
    }
  }, [order._id]);

  const handleCloseModal = useCallback(() => {
    props.setShowCancel;
  }, [props.setShowCancel]);

  return (
    <div className="h-[90vh] flex flex-col items-center">
      <div className="flex-center font-poppins justify-end w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <span onClick={() => handleCloseModal()}>
          <GrClose />
        </span>
      </div>

      <div className="grid place-items-center my-auto">
        <h2 className="font-[600] text-lg">Processing Payment</h2>

        <img
          src="/assets/graphics/processPayment.svg"
          className="mt-2"
          alt=""
        />
      </div>

      <div className="mt-auto px-4">
        <h2>
          Your payment is being processed, once recieved you will be notified
        </h2>

        {/* {!updateOrderStatus.isError ? ( */}
        <button
          disabled={updateOrderStatus.isPending}
          onClick={retryOrderUpdate}
          className={`${
            updateOrderStatus.isPending ? "bg-gray-300" : "blue-gradient"
          } rounded-[12px] mt-[40px] font-poppins mx-auto hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px] grid place-items-center w-full`}
        >
          {updateOrderStatus.isPending ? (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>Retry</span>
          )}
        </button>
        {/* ) :  */}

        {/* // ( */}
        {/* <button
            disabled={updateOrderStatus.isPending}
            onClick={handleContinue}
            className={`${
              updateOrderStatus.isPending ? "bg-gray-300" : "blue-gradient"
            } rounded-[12px] mt-[40px] font-poppins mx-auto hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px] grid place-items-center w-full`}
          >
            {updateOrderStatus.isPending ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Continue</span>
            )}
          </button> */}
      </div>
    </div>
  );
};

export default memo(ProcessingPayment);
