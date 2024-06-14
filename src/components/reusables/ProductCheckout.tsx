import Backdrop from "./Backdrop";
import { Dispatch, SetStateAction, useState } from "react";

import { IComponentMap } from "@/types/general";
import DescriptionSection from "../containers/checkout/DescriptionSection";
import ProductForm from "../containers/checkout/ProductForm";
import OrderSummary from "../containers/checkout/OrderSummary";
import PaymentSuccessful from "../containers/checkout/PaymentSuccessful";
import ProcessingPayment from "../containers/checkout/ProcessingPayment";

const ProductCheckout = (props: {
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
  showCheckout: boolean;
  categoryName: string;
}) => {
  const [stage, setStage] = useState<number>(1);

  const stageMap: IComponentMap = {
    1: (
      <DescriptionSection
        setStage={setStage}
        setShowcheckout={props.setShowcheckout}
      />
    ),
    2: (
      <ProductForm
        setStage={setStage}
        setShowcheckout={props.setShowcheckout}
      />
    ),
    3: (
      <OrderSummary
        setStage={setStage}
        setShowcheckout={props.setShowcheckout}
      />
    ),
    4: (
      <ProcessingPayment
        setStage={setStage}
        setShowcheckout={props.setShowcheckout}
      />
    ),
    5: (
      <PaymentSuccessful
        setStage={setStage}
        setShowcheckout={props.setShowcheckout}
      />
    ),
  };

  return (
    <Backdrop
      classnames="flex justify-center md:justify-end"
      setShow={props.setShowcheckout}
      show={props.showCheckout}
    >
      <div
        className={`bg-white
        mt-10 mx-auto w-[90vw] t
       md:w-[380px] border h-[90vh] md:mt-0 md:h-[100vh] overflow-y-scroll pb-[30px]`}
      >
        {stageMap[stage]}
      </div>
    </Backdrop>
  );
};

export default ProductCheckout;
