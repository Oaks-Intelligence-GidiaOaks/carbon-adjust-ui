import Backdrop from "./Backdrop";
import { Dispatch, SetStateAction, useState } from "react";

import { IComponentMap } from "@/types/general";
import DescriptionSection from "../containers/checkout/DescriptionSection";
import ProductForm from "../containers/checkout/ProductForm";
import OrderSummary from "../containers/checkout/OrderSummary";
import PaymentSuccessful from "../containers/checkout/PaymentSuccessful";
import ProcessingPayment from "../containers/checkout/ProcessingPayment";
import CloseModal from "./CloseModal";
import { clearProduct } from "@/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder } from "@/features/orderSlice";
import useDisableScroll from "@/hooks/useDisableScroll";
import SocketService from "@/repository/socket";
import {
  ICancelAddToBasketEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import { RootState } from "@/app/store";

const ProductCheckout = (props: {
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
  showCheckout: boolean;
  categoryName: string;
}) => {
  const { product, user } = useSelector((state: RootState) => state);

  const [stage, setStage] = useState<number>(1);
  const [showCancel, setShowCancel] = useState<boolean>(false);

  useDisableScroll(props.showCheckout);

  const dispatch = useDispatch();

  const cancelCheckout = () => {
    const basketPayload: ICancelAddToBasketEventPayload = {
      packageCategory: product.category?.name as string,
      packageId: product._id,
      packageName: product.title,
      packagePrice: Number(product.price),
      pakageType: product.packageType,
      time: Date.now(),
      userId: user.user?._id as string,
      eventName: SubLevelEvent.CANCEL_ADD_TO_CART_EVENT,
    };

    SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, basketPayload);

    dispatch(clearProduct());
    dispatch(clearOrder());
    props.setShowcheckout(false);
  };

  const stageMap: IComponentMap = {
    1: (
      <DescriptionSection
        setShowCancel={setShowCancel}
        setStage={setStage}
        setShowcheckout={cancelCheckout}
      />
    ),
    2: (
      <ProductForm
        setShowCancel={setShowCancel}
        setStage={setStage}
        setShowcheckout={cancelCheckout}
      />
    ),
    3: (
      <OrderSummary
        setShowCancel={setShowCancel}
        setStage={setStage}
        setShowcheckout={cancelCheckout}
      />
    ),
    4: (
      <ProcessingPayment
        setShowCancel={setShowCancel}
        setStage={setStage}
        setShowcheckout={cancelCheckout}
      />
    ),
    5: (
      <PaymentSuccessful
        setShowCancel={setShowCancel}
        setStage={setStage}
        setShowcheckout={cancelCheckout}
      />
    ),
  };

  // Component - component
  const CancelModal = () => {
    return (
      <Backdrop setShow={props.setShowcheckout} show={showCancel}>
        <div className="z-[100] top-[40%] left-[2%] md:left-[20%] w-[400px] absolute border grid place-items-center cursor-pointer">
          <CloseModal
            cancelCheckout={cancelCheckout}
            removeModal={() => setShowCancel(false)}
          />
        </div>
      </Backdrop>
    );
  };

  return (
    <Backdrop
      classnames="flex justify-center md:justify-end"
      setShow={props.setShowcheckout}
      show={props.showCheckout}
    >
      <div className="relative w-[100vw]">
        {/* checkout */}
        <div className="flex  justify-center md:justify-end ">
          <div
            className={`bg-white mt-10 mx-auto md:mx-0 ds:w-[90vw] h-[90vh] md:mt-0 md:h-[100vh] overflow-y-scroll pb-[30px] w-fit safari-only`}
          >
            {stageMap[stage]}
          </div>
        </div>

        {/* no checkout modal */}
        <CancelModal />
      </div>
    </Backdrop>
  );
};

export default ProductCheckout;
