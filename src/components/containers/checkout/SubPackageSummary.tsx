import { RootState } from "@/app/store";
// import { clearProduct } from "@/features/productSlice";
import { IResponse } from "@/interfaces/orderData.interface";
import { createNewOrder } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
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
      <p className="mx-6 mt-[10%]">
        Add your sub package order summary here . The one containing the
        restricted wallet
      </p>
    </div>
  );
};

export default SubPackageSummary;
