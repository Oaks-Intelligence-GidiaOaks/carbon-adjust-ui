import { RootState } from "@/app/store";
import { Input } from "@/components/ui";
// import SelectInput from "@/components/ui/SelectInput";
import {
  clearOrder,
  updateAddress,
  updateEmail,
  updateOrderDetails,
  updatePhone,
  updateResponses,
} from "@/features/orderSlice";
import { createNewOrder } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
// import { IOrder } from "@/interfaces/orderData.interface";
// import { SelectItem } from "@/types/formSelect";
// import { Product } from "@/types/product";
import { Dispatch, SetStateAction, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
// import { SingleValue } from "react-select";

const ProductForm = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    product: { product },
    order,
  }: RootState = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const orderProduct = useMutation({
    mutationKey: ["order-product"],
    mutationFn: (dt) => createNewOrder(dt),
  });

  const handleChange = (e: any, key: any) => {
    dispatch(
      updateOrderDetails({
        ...order,
        [key]: e.target.value,
      })
    );
  };

  const RenderQuestions = product?.questions?.map((item) => {
    const [response, setResponse] = useState<string>("");

    const handleAnswerQuestion = (val: string) => {
      setResponse(val);
      dispatch(
        updateResponses({
          question: item.title,
          response: val,
        })
      );
    };

    return (
      <div className="flex flex-col gap-[8px]">
        <p className="font-[400] text-sm text-[#333333]">{item.title}</p>

        <div className="flex flex-col gap-2">
          <div className="flex-center gap-[6px]">
            <input
              onChange={(e) => handleAnswerQuestion("yes")}
              value={response}
              type="radio"
              name=""
              id=""
              checked={response === "yes"}
              className="bg-[#0E89F7] h-4 w-4"
            />
            <span>Yes</span>
          </div>

          <div className="flex-center gap-[6px]">
            <input
              onChange={() => handleAnswerQuestion("no")}
              checked={response === "no"}
              type="radio"
              name=""
              id=""
              className="bg-[#0E89F7] h-4 w-4"
            />
            <span>No</span>
          </div>
        </div>
      </div>
    );
  });

  const handleProceed = () => {
    orderProduct.mutate({ ...order, package: product._id, responses: [] });

    if (orderProduct.isSuccess) {
      dispatch(clearOrder({}));
      props.setStage(3);
    }
  };

  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <h2 className="font-[600] text-lg">Home Energy Package</h2>

        <span onClick={() => props.setShowcheckout(false)}>
          <GrClose />
        </span>
      </div>

      <div className="w-5/6 mx-auto">
        <h6 className="font-[400] text-sm py-[22px]">
          Please provide the below details to enable us complete your order for
          this product.
        </h6>

        <div className="flex flex-col gap-4">
          <Input
            label="Package"
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder="Window Retrofitting"
            value={product!.title}
            readOnly
          />

          <Input
            label="Enter address"
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder=""
            onChange={(e) => {
              dispatch(updateAddress(e.target.value));
            }}
            value={order.customerAddress}
          />

          <Input
            label="Enter email address"
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder=""
            onChange={(e) => dispatch(updateEmail(e.target.value))}
            value={order.customerEmail}
          />

          {/* tel input */}
          <Input
            label="Enter phone number"
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder="+234"
            type="number"
            value={order.customerPhone}
            onChange={(e) => dispatch(updatePhone(e.target.value))}
          />

          {/* Questions - responses */}
          {RenderQuestions}

          {/* <div>
              <SelectInput
                options={[]}
                className=""
                value={{ label: "value", value: "value" }}
                label="How much are you willing to spend on your retrofit journey in the next year?"
                onChange={(_: SingleValue<SelectItem>) => {}}
                placeholder=""
              />
            </div> */}

          {/* proceed */}
          <button
            className="rounded-[12px] mt-[40px] font-poppins w-full blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]"
            onClick={handleProceed}
          >
            <span>Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
