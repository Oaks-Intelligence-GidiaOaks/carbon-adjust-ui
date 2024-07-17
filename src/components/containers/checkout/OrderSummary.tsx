import { RootState } from "@/app/store";
// import { clearProduct } from "@/features/productSlice";
import { IResponse } from "@/interfaces/orderData.interface";
import { createNewOrder } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { updateOrderId, updatePrice } from "@/features/orderSlice";
import { useNavigate } from "react-router-dom";

type IAddress = {
  country: string;
  cityOrProvince: string;
  firstLineAddress: string;
  zipcode: string;
};

type IOrder = {
  package?: string;
  customerAddress: IAddress;
  price?: number | string;
  customerEmail: string;
  customerPhone: string;
  quantity?: number | string;
  requiredExtraProd?: boolean;
  responses: IResponse[];
  _id?: string;
};

const OrderSummary = (props: {
  setShowCancel: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { order, product, user } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = useMutation({
    mutationKey: ["create-order"],
    mutationFn: (orderData: IOrder) => createNewOrder(orderData),
    onSuccess: (sx: any) => {
      dispatch(updateOrderId(sx.data._id));
      dispatch(updatePrice(sx.data.price));
      // console.log(sx.data, "order data");

      // console.log(product, "product");

      // redirect to process payment page
      if (product.price && Number(product.price) > 0) {
        navigate(`/dashboard/payment/${sx.data._id}`);
      } else {
        props.setStage(5);
      }

      // props.setStage(4);
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
      customerEmail: user.user!.email,
      customerAddress: {
        country: order.customerAddress.country.value,
        cityOrProvince: order.customerAddress.cityOrProvince.value,
        firstLineAddress: order.customerAddress.firstLineAddress,
        zipcode: order.customerAddress.zipcode,
      },
    };

    createOrder.mutate(newOrder);

    // console.log(newOrder, "new  order");
  };

  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <div className="flex-center gap-[13px]">
          <IoIosArrowRoundBack onClick={() => props.setStage(2)} />
          <h2 className="font-[600] text-lg">Check Out</h2>
        </div>

        <span onClick={() => props.setShowCancel(true)}>
          <GrClose />
        </span>
      </div>

      <div className="flex flex-col gap-[22px] border px-5 mx-auto">
        <h2 className="font-[600] text-lg mt-3">Order Summary</h2>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Price (£): </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {product.price || 0}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2 "> Package : </span>
          <span className="font-[400] text-sm w-1/2 pl-2">{product.title}</span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">
            First Line of Address:{" "}
          </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerAddress.firstLineAddress}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">Country:</span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerAddress.country.label}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">City/Province: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerAddress.cityOrProvince.label}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Email Address: </span>
          <span className="font-[400] text-sm  truncate w-1/2 pl-2">
            {user.user?.email}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2">Zip code: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerAddress.zipcode}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-sm w-1/2"> Phone Number: </span>
          <span className="font-[400] text-sm w-1/2 pl-2">
            {order.customerPhone}
          </span>
        </div>

        {product.packageType === "Product" && (
          <div className="flex-start">
            <span className="font-[600] text-sm w-1/2"> Quantity</span>
            <span className="font-[400] text-sm w-1/2 pl-2">
              {order.quantity}
            </span>
          </div>
        )}

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
