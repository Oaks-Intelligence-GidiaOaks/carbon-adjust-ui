import { RootState } from "@/app/store";
import { Input } from "@/components/ui";
// import SelectInput from "@/components/ui/SelectInput";
import {
  clearOrder,
  // clearOrder,
  updateAddress,
  updateEmail,
  // updateOrderDetails,
  updatePhone,
  updateResponses,
} from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
// import { createNewOrder } from "@/services/homeOwner";
// import { useMutation } from "@tanstack/react-query";
// import { IOrder } from "@/interfaces/orderData.interface";
// import { SelectItem } from "@/types/formSelect";
// import { Product } from "@/types/product";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { IComponentMap } from "@/types/general";
import SelectInput from "@/components/ui/SelectInput";
import {
  fileToBase64,
  formatSelectOptions,
  // revertSelectOptions,
} from "@/lib/utils";
import { IResponse } from "@/interfaces/orderData.interface";
import { SelectItem } from "@/types/formSelect";

const ProductForm = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
}) => {
  const { product, order }: RootState = useSelector(
    (state: RootState) => state
  );

  // console.log(questions, "my questions");
  // console.log(product.questions, "state questions");

  const dispatch = useDispatch();

  const RenderQuestions = product.questions?.map((item: any) => {
    const [response, setResponse] = useState<string>("");
    const [selectResponse, setSelectResponse] = useState<SelectItem>({
      label: "",
      value: "",
    });
    // const [fileResponse, setFileResponse] = useState<string>("");
    const [multiChoiceResponse, setMultiChoiceResponse] = useState<string[]>(
      []
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateOrAddObject = (arr: IResponse[], newObj: IResponse) => {
      console.log(arr, " array");
      console.log(newObj, "new obj");

      if (!arr.length) {
        let responseData = [newObj];
        return responseData;
      }

      const itemIndex = arr.findIndex(
        (arrItem) => arrItem.question === newObj.question
      );

      if (itemIndex === -1) {
        return [...arr, newObj];
      } else {
        const updatedArr = [...arr];
        updatedArr[itemIndex] = { ...arr[itemIndex], ...newObj };
        return updatedArr;
      }
    };

    const handleAnswerQuestion = async (
      val: string,
      type: string,
      file?: File,
      isChecked?: boolean
    ) => {
      if (type === "yes_no") {
        setResponse(val);

        let newObj = {
          question: item._id,
          response: val,
        };

        let newArr = updateOrAddObject(order.responses, newObj);
        // console.log(newArr, "new array");
        dispatch(updateResponses(newArr));
      }

      if (type === "named_text") {
        setResponse(val);

        let newObj = {
          question: item._id,
          response: val,
        };

        let newArr = updateOrAddObject(order.responses, newObj);

        dispatch(updateResponses(newArr));
      }

      if (type === "single_choice") {
        setSelectResponse(formatSelectOptions([val])[0]);
        let newObj = {
          question: item._id,
          response: val,
        };

        let newArr = updateOrAddObject(order.responses, newObj);

        dispatch(updateResponses(newArr));
      }

      if (type === "multi_choice" && isChecked !== undefined) {
        let updatedMultiChoiceResponse;
        if (isChecked) {
          updatedMultiChoiceResponse = [...multiChoiceResponse, val];
        } else {
          updatedMultiChoiceResponse = multiChoiceResponse.filter(
            (option) => option !== val
          );
        }
        setMultiChoiceResponse(updatedMultiChoiceResponse);

        let newObj = {
          question: item._id,
          response: updatedMultiChoiceResponse.join(", "), // Join selected options into a single string
        };

        let newArr = updateOrAddObject(order.responses, newObj);
        dispatch(updateResponses(newArr));
      }

      if (type === "upload_file" && file) {
        if (file!.size > 1048576 * 2) {
          alert("file size exceeds 2MB, please choose another file.");
          fileInputRef!.current!.value = "";
          return null;
        } else {
          console.log(file, "on change file");
          const fileString = await fileToBase64(file);

          // console.log(fileString, "file string");

          const newObj: IResponse = {
            question: item._id,
            response: fileString,
          };

          const newArr = updateOrAddObject(order.responses, newObj);
          dispatch(updateResponses(newArr));
        }
      }
    };

    const getQuestionInput: IComponentMap = {
      yes_no: (
        <div className="flex flex-col gap-2">
          <div className="flex-center gap-[6px]">
            <input
              onChange={(_: React.ChangeEvent<HTMLInputElement>) =>
                handleAnswerQuestion("yes", "yes_no")
              }
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
              onChange={(_: React.ChangeEvent<HTMLInputElement>) =>
                handleAnswerQuestion("no", "yes_no")
              }
              checked={response === "no"}
              type="radio"
              name=""
              id=""
              className="bg-[#0E89F7] h-4 w-4"
            />
            <span>No</span>
          </div>
        </div>
      ),
      named_text: (
        <div>
          <Input
            key={5}
            onChange={(e) => handleAnswerQuestion(e.target.value, "named_text")}
            value={response}
            name=""
            type="text"
            placeholder="add text"
          />
        </div>
      ),
      multi_choice: (
        <div className="flex flex-col gap-1 text-sm" key={9}>
          {item?.options?.map((it: string, i: number) => (
            <div key={i} className="flex-center gap-2 ">
              <input
                type="checkbox"
                name=""
                id=""
                checked={multiChoiceResponse.includes(it)}
                onChange={(e) =>
                  handleAnswerQuestion(
                    it,
                    "multi_choice",
                    undefined,
                    e.target.checked
                  )
                }
              />
              <label htmlFor="">{it}</label>
            </div>
          ))}
        </div>
      ),
      single_choice: (
        <div key={7}>
          <SelectInput
            options={formatSelectOptions(item?.options || [])}
            onChange={(e) => handleAnswerQuestion(e!.value, "single_choice")}
            value={selectResponse}
          />
        </div>
      ),
      upload_file: (
        <div key={10}>
          <input
            type="file"
            ref={fileInputRef}
            name=""
            id=""
            onChange={(e) =>
              handleAnswerQuestion("", "upload_file", e.target.files?.[0])
            }
          />
        </div>
      ),
    };

    return (
      <div className="flex flex-col gap-[8px]">
        <p className="font-[400] text-sm text-[#333333]">{item?.title}</p>

        {getQuestionInput[item?.questionType]}
      </div>
    );
  });

  const handleProceed = () => {
    // orderProduct.mutate();
    props.setStage(3);
  };

  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <h2 className="font-[600] text-lg">Home Energy Package</h2>

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

      <div className="w-5/6 mx-auto">
        <h6 className="font-[400] text-sm py-[22px]">
          Please provide the below details to enable us complete your order for
          this product.
        </h6>

        <div className="flex flex-col gap-4">
          <Input
            key={1}
            label="Package"
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder="Window Retrofitting"
            value={product?.title}
            readOnly
          />

          <Input
            key={2}
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
            key={3}
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
            key={4}
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
//
