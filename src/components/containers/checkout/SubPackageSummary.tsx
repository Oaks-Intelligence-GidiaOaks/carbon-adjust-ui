import { RootState } from "@/app/store";
// import { clearProduct } from "@/features/productSlice";
import { IResponse } from "@/interfaces/orderData.interface";
import { createNewOrder } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
//   @ts-ignore
import { GrClose } from "react-icons/gr";
//   @ts-ignore
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
//   @ts-ignore
import { Oval } from "react-loader-spinner";
import { updateOrderId, updatePrice } from "@/features/orderSlice";
import { useNavigate } from "react-router-dom";
import SocketService from "@/repository/socket";
import {
  IInitializeEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import { PackageDomain } from "@/interfaces/product.interface";
import RadioGroupComponent from "@/components/ui/RadioGroup";

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

const SubPackageSummary = (props: {
  setShowCancel: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { order, product, user } = useSelector((state: RootState) => state);
  const [selectedOption, setSelectedOption] = useState("Restricted wallet");

  const options = ["Restricted wallet"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = useMutation({
    mutationKey: ["create-order"],
    mutationFn: (orderData: IOrder) => createNewOrder(orderData),
    onSuccess: (sx: any) => {
      dispatch(updateOrderId(sx.data._id));
      dispatch(updatePrice(sx.data.price));

      if (product.packageDomain === PackageDomain.SUB_PACKAGE) {
        props.setStage(5);
      } else if (product.price && Number(product.price) > 0) {
        // redirect to process payment page
        navigate(`/dashboard/payment/${sx.data._id}`);
      } else {
        props.setStage(5);
      }
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const initializeEventPayload: IInitializeEventPayload = {
    country: order.customerAddress.country.value,
    city: order.customerAddress.cityOrProvince.value,
    userId: user.user?._id as string,
    packageId: product._id,
    packageName: product.title,
    pakageType: product.packageType,
    packageCategory: product.category?.name as string,
    packagePrice: Number(product.price),
    time: Date.now(),
    eventName: SubLevelEvent.INITIALIZE_ORDER_EVENT,
  };

  //   @ts-ignore
  const isDisabled = createOrder.isPending;

  //   @ts-ignore
  const handleOrderPayment = () => {
    SocketService.emit(
      MonitoringEvent.NEW_SUBLEVEL_EVENT,
      initializeEventPayload
    );

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
  };

  return (
    <div className="md:w-[380px]">
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <div className="flex-center gap-[13px]">
          <IoIosArrowRoundBack onClick={() => props.setStage(2)} />
          <h2 className="font-[600] text-lg">Check Out</h2>
        </div>

        <span onClick={() => props.setShowCancel(true)}>
          <GrClose />
        </span>
      </div>

      <div className="flex flex-col font-poppins gap-[22px] px-5 mx-auto">
        <h2 className="font-[400] font-poppins text-[#333333] mt-3">Order Summary</h2>

        <div className="flex-start">
          <span className="text-sm w-1/2 text-[#8F8F8F] "> Category : </span>
          <span className="font-[600] text-sm w-1/2 pl-2 text-[#333333]">
            {product?.category?.name}
          </span>
        </div>
        <div className="flex-start">
          <span className=" text-sm w-1/2 text-[#8F8F8F] "> Package : </span>
          <span className="font-[600] text-sm w-1/2 pl-2 text-[#333333]">{product?.title}</span>
        </div>

        <div className="flex-start">
          <span className="text-sm w-1/2 text-[#8F8F8F]"> Created by : </span>
          <span className="font-[600] text-sm w-1/2 pl-2 text-[#333333]">{product?.owner?.name}</span>
        </div>

        <div className="flex-start">
          <span className="text-sm w-1/2 text-[#8F8F8F]"> Amount (£): </span>
          <span className="font-[600] text-sm w-1/2 pl-2 text-[#333333]">
            {product.price || 0}
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

           {/* RadioGroup for Payment Option */}
        <div>
          <h2 className="font-[600] text-sm text-[#575757]">Payment option</h2>
          <RadioGroupComponent
            options={options}
            value={selectedOption}
            setValue={setSelectedOption}
            showCheckMark={false}
            wrapperClassName="custom-radio-wrapper" 
            size="w-[20px] h-[20px]"
            className="text-blue-600"
          />
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

export default SubPackageSummary;
