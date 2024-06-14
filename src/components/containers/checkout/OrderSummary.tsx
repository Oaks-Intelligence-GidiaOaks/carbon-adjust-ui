import { RootState } from "@/app/store";
import { clearProduct } from "@/features/productSlice";
import { IOrder } from "@/interfaces/orderData.interface";
import { createNewOrder } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { clearOrder, updateOrderId } from "@/features/orderSlice";

const OrderSummary = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { order, product } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const createOrder = useMutation({
    mutationKey: ["create-order"],
    mutationFn: (orderData: IOrder) => createNewOrder(orderData),
    onSuccess: (sx: any) => {
      dispatch(updateOrderId(sx.data._id));

      props.setStage(4);
      // toast.loading("order processing", {
      //   duration: 1000,
      // });
    },
    onError: (ex: any) => {
      console.log(ex);
      toast.error(ex.response.data.message);
    },
  });

  const isDisabled = createOrder.isPending;

  const handleOrderPayment = () => {
    const newOrder: IOrder = {
      ...order,
      package: product._id,
      price: product.price || 0,
      // requiredExtraProd: true,
    };

    console.log(newOrder, "new  order");

    createOrder.mutate(newOrder);
  };

  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <div className="flex-center gap-[13px]">
          <IoIosArrowRoundBack onClick={() => props.setStage(2)} />
          <h2 className="font-[600] text-lg">Check Out</h2>
        </div>

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

      <div className="flex flex-col gap-[22px] border px-5 mx-auto">
        <h2 className="font-[600] text-lg mt-3">Order Summary</h2>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Price $: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {" "}
            {product.price}{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2 "> Package : </span>
          <span className="font-[400] text-sm w-1/2 pl-2">{product.title}</span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Address: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerAddress}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Email Address: </span>
          <span className="font-[400] text-sm  truncate w-1/2 pl-2">
            {order.customerEmail}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Phone Number: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerPhone}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {product.questions.map((it, i) => (
            <div className="flex-start">
              <span className="font-[600] text-sm w-1/2">
                {/* Will you need any other product?: */}
                {it.title}
              </span>

              <span className="font-[400] text-sm w-1/2 pl-2 truncate">
                {order.responses[i]?.response}
              </span>
            </div>
          ))}
        </div>

        <button
          disabled={isDisabled}
          onClick={() => handleOrderPayment()}
          className={`${
            isDisabled ? "bg-gray-300" : "blue-gradient"
          } rounded-[12px] mt-[40px] font-poppins w-full  hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px] grid place-items-center`}
        >
          {isDisabled ? (
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
            <span>Proceed to pay</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
