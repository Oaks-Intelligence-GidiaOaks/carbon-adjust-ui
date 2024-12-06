import { RootState } from "@/app/store";
import { CountryRegionDropdown, Input } from "@/components/ui";
// import SelectInput from "@/components/ui/SelectInput";
import {
  updateAddress,
  updateCity,
  updateCountry,
  // updateEmail,
  // updateOrderDetails,
  updatePhone,
  // updateQuantity,
  updateResponses,
  updatepPostCode,
} from "@/features/orderSlice";
// import { clearProduct } from "@/features/productSlice";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IComponentMap } from "@/types/general";
import SelectInput from "@/components/ui/SelectInput";
import { fileToBase64, formatSelectOptions, stringToArray } from "@/lib/utils";
import { IResponse } from "@/interfaces/orderData.interface";
import { SelectItem } from "@/types/formSelect";
import { Country, State } from "country-state-city";
import Phoneinput from "@/components/ui/PhoneInput";
// import { MdArrowBack } from "react-icons/md";
import { IQuestion } from "@/interfaces/product.interface";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import router from "@/router/router";

interface ProductFormV2Props {
  questions: IQuestion[];
}

const ProductFormV2 = ({questions}: ProductFormV2Props) => {
  const dispatch = useDispatch();

  const {order, user }: RootState = useSelector(
    (state: RootState) => state
  );

  let countryData = Country.getAllCountries();
  const [statesList, setStatesList] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setStatesList(
      State.getStatesOfCountry(order.customerAddress.country?.value).map(
        (state) => ({
          label: state.name,
          value: state.isoCode,
        })
      )
    );

    dispatch(updateCity({ label: "", value: "" }));
  }, [order.customerAddress.country.value, dispatch]);

  const { responses, _id, customerAddress, ...rest } = order;

  const isFormValues =
    Object.values({ ...rest }).filter((it: any) => it.toString().length < 1)
      .length > 0;

  const isLocation =
    customerAddress.country.value.length > 0 &&
    customerAddress.cityOrProvince.value.length > 0 &&
    customerAddress.firstLineAddress.length > 0 &&
    customerAddress.zipcode.length > 0;

  // filter to get required responses and compare with required questions.
  const isDisabled: boolean = Boolean(
    questions.filter((item) => item.isRequired).length !==
      responses.filter((item) => item.isRequired).length ||
      isFormValues ||
      !isLocation
  );

  const RenderQuestions = questions?.map((item: IQuestion) => {
    const responseIndex = responses.findIndex(
      (it: any) => it.question === item._id
    );

    let getResponse =
      responseIndex === -1 ? "" : responses[responseIndex].response;

    let getSelectResponse =
      responseIndex === -1
        ? {
            label: "",
            value: "",
          }
        : formatSelectOptions([responses[responseIndex].response])[0];

    let getmultiChoiceResponse =
      responseIndex === -1
        ? []
        : stringToArray(responses[responseIndex].response);

    // console.log(getmultiChoiceResponse, "multi -choice response");

    const [response, setResponse] = useState<string>(getResponse);
    const [selectResponse, setSelectResponse] =
      useState<SelectItem>(getSelectResponse);
    const [multiChoiceResponse, setMultiChoiceResponse] = useState<string[]>(
      getmultiChoiceResponse
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateOrAddObject = (arr: IResponse[], newObj: IResponse) => {


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
      if (type === "Binary Response Question") {
        setResponse(val);

        let newObj: IResponse = {
          question: item._id,
          response: val,
        };

        if (item.isRequired !== null || item.isRequired !== undefined) {
          newObj.isRequired = item.isRequired;
        }

        let newArr = updateOrAddObject(order.responses, newObj);
        // console.log(newArr, "new array");
        dispatch(updateResponses(newArr));
      }

      if (type === "Open-Ended Question") {
        setResponse(val);

        let newObj: IResponse = {
          question: item._id,
          response: val,
        };

        if (item.isRequired !== null || item.isRequired !== undefined) {
          newObj.isRequired = item.isRequired;
        }

        let newArr = updateOrAddObject(order.responses, newObj);

        dispatch(updateResponses(newArr));
      }

      if (type === "Single-Choice Question") {
        setSelectResponse(formatSelectOptions([val])[0]);
        let newObj: IResponse = {
          question: item._id,
          response: val,
        };

        if (item.isRequired !== null || item.isRequired !== undefined) {
          newObj.isRequired = item.isRequired;
        }

        let newArr = updateOrAddObject(order.responses, newObj);

        dispatch(updateResponses(newArr));
      }

      if (type === "Multiple-Choice Question" && isChecked !== undefined) {
        let updatedMultiChoiceResponse;

        if (isChecked) {
          updatedMultiChoiceResponse = [
            ...new Set([...multiChoiceResponse, val]),
          ];
        } else {
          updatedMultiChoiceResponse = multiChoiceResponse.filter(
            (option) => option !== val
          );
        }
        setMultiChoiceResponse(updatedMultiChoiceResponse);

        let newObj: IResponse = {
          question: item._id,
          response: updatedMultiChoiceResponse.join(", "), // Join selected options into a single string
        };

        if (item.isRequired !== null || item.isRequired !== undefined) {
          newObj.isRequired = item.isRequired;
        }

        let newArr = updateOrAddObject(order.responses, newObj);
        dispatch(updateResponses(newArr));
      }

      if (type === "File Upload Response Question" && file) {
        if (file!.size > 1048576 * 10) {
          alert("file size exceeds 10MB, please choose another file.");
          fileInputRef!.current!.value = "";
          return null;
        } else {
          const fileString = await fileToBase64(file);

          const newObj: IResponse = {
            question: item._id,
            response: fileString,
          };

          if (item.isRequired !== null || item.isRequired !== undefined) {
            newObj.isRequired = item.isRequired;
          }

          const newArr = updateOrAddObject(order.responses, newObj);
          dispatch(updateResponses(newArr));
        }
      }
    };

    const getQuestionInput: IComponentMap = {
      "Binary Response Question": (
        <div className="flex flex-col gap-2">
          <div className="flex-center gap-[6px]">
            <input
              onChange={(_: React.ChangeEvent<HTMLInputElement>) =>
                handleAnswerQuestion("Yes", "Binary Response Question")
              }
              value={response}
              type="radio"
              name=""
              id=""
              checked={response === "Yes"}
              className="bg-[#0E89F7] h-4 w-4"
            />
            <span>Yes</span>
          </div>

          <div className="flex-center gap-[6px]">
            <input
              onChange={(_: React.ChangeEvent<HTMLInputElement>) =>
                handleAnswerQuestion("No", "Binary Response Question")
              }
              checked={response === "No"}
              type="radio"
              name=""
              id=""
              className="bg-[#0E89F7] h-4 w-4"
            />
            <span>No</span>
          </div>
        </div>
      ),
      "Open-Ended Question": (
        <div>
          <Input
            key={5}
            onChange={(e) =>
              handleAnswerQuestion(e.target.value, "Open-Ended Question")
            }
            inputClassName="border p-3 bg-gray-100"
            value={response}
            name=""
            type="text"
            placeholder="add text"
          />
        </div>
      ),
      "Multiple-Choice Question": (
        <div className="flex flex-col gap-1 text-sm" key={9}>
          {item?.options?.map((it: string, i: number) => (
            <div key={i} className="flex-center gap-2 ">
              <input
                type="checkbox"
                name=""
                id={`multi_choice_${item._id}_${i}`}
                checked={multiChoiceResponse.includes(it)}
                onChange={(e) =>
                  handleAnswerQuestion(
                    it,
                    "Multiple-Choice Question",
                    undefined,
                    e.target.checked
                  )
                }
              />
              <label htmlFor={`multi_choice_${item._id}_${i}`}>{it}</label>
            </div>
          ))}
        </div>
      ),
      "Single-Choice Question": (
        <div key={7}>
          <SelectInput
            options={formatSelectOptions(item?.options || [])}
            onChange={(e) =>
              handleAnswerQuestion(e!.value, "Single-Choice Question")
            }
            value={selectResponse}
          />
        </div>
      ),
      "File Upload Response Question": (
        <div key={10}>
          <input
            type="file"
            ref={fileInputRef}
            name=""
            id=""
            onChange={(e) =>
              handleAnswerQuestion(
                "",
                "File Upload Response Question",
                e.target.files?.[0]
              )
            }
          />
        </div>
      ),
    };

    return (
      <div className="flex flex-col gap-[8px]">
        <p className="font-[400] text-sm text-[#333333]">
          {item?.title}

          {Boolean(item.isRequired) && (
            <span className="pl-1 text-red-500">*</span>
          )}
        </p>

        {getQuestionInput[item?.questionType!]}
      </div>
    );
  });

  const handleProceed = () => {
    // if (product.packageDomain === PackageDomain.SUB_PACKAGE) {
    //   props.setStage(6);
    // } else {
    //   props.setStage(3);
    // }
    router.navigate('/dashboard/cart');
  };

  return (
    <div className="border border-gray-300 p-6 rounded-md max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-2">Questions</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please provide the below answers to the questions to enable us complete
        your order for this product.
      </p>

      <div className="">
        <div className="flex flex-col gap-4">
          <Input
            key={80}
            label="Name"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-gray-100"
            placeholder="Window Retrofitting"
            value={user.user!.name}
            readOnly
          />

          {/* tel input */}
          <Phoneinput
            name="tel"
            label="Phone"
            required
            labelClassName="mb-4"
            inputClassName="bg-gray-100 text-[#000000]"
            placeholder="+234"
            value={order.customerPhone}
            onInputChange={(_, __, ___, formattedValue: string) => {
              console.log(formattedValue);
              dispatch(updatePhone(formattedValue));
            }}
          />

          <Input
            key={2}
            label="First Line of address"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name=""
            error=""
            inputClassName="border p-3 bg-gray-100"
            placeholder=""
            onChange={(e) => {
              dispatch(updateAddress(e.target.value));
            }}
            value={order.customerAddress.firstLineAddress}
          />

          {/* <Input
            key={4}
            label="Phone number"
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
          /> */}

          {/* quantity */}
          {/* {product.packageType === "Product" && (
            <div>
              <label
                htmlFor=""
                className=" block text-sm group-valid:text-[#171717] group-has-[:valid]:text-[#171717] pb-2"
              >
                Add Quantity
                <span className="text-red-500 pl-1">*</span>
              </label>

              <div
                className={`
                  "gro flex h-[48px] min-w-full items-center overflow-hidden  rounded-md border-none border-input px-3 focus-within:border-[#22C55E] border p-3 bg-[#E4E7E8]`}
              >
                <input
                  type="number"
                  placeholder="Add quantity 0 to 9"
                  value={order.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    )
                  }
                  className={`
                    "placeholder:text-grey-swatch-600 flex h-[48px] w-full flex-1 bg-transparent py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                  min="0"
                />
              </div>
            </div>
          )} */}

          {/* new fields */}

          {/* country dropdown  */}
          <CountryRegionDropdown
            name="countryOfResidence"
            labelClassName="mb-4 text-[#000000_!important]"
            options={countryData.map((country) => ({
              label: country.name,
              value: country.isoCode,
              prefixIcon: country.flag,
            }))}
            required
            searchable={true}
            label="Country of Residence"
            wrapperClassName="bg-gray-100 w-full"
            placeholder="Select country"
            value={order.customerAddress.country}
            countryChange={(value) => {
              dispatch(updateCountry(value));
            }}
          />

          {/* city dropdown */}
          <CountryRegionDropdown
            required
            name="city/province"
            labelClassName="mb-4 text-[#000000_!important]"
            options={statesList}
            searchable={true}
            label="City/Province"
            wrapperClassName="bg-gray-100 w-full"
            placeholder="Select city/province"
            value={order.customerAddress.cityOrProvince}
            cityChange={(value) => dispatch(updateCity(value))}
          />

          <Input
            name="zipCode"
            required
            label="Zip Code"
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            placeholder="Enter zip code"
            value={order.customerAddress.zipcode}
            onChange={(e) => dispatch(updatepPostCode(e.target.value))}
          />

          {/* Questions - responses */}
          {RenderQuestions}

          {/* proceed */}
          <div className="flex gap-2 items-center">
          <Link to={""} className="w-full">
          <button disabled={isDisabled} className={`${
              isDisabled ? "border-gray-300 text-gray-600 cursor-not-allowed" : "bg-transparent text-[#0B8DFF] border-[#0B8DFF]"} w-full py-2 flex items-center justify-center gap-1 text-center border  rounded-full`}>
          <BsCart3 /> Add to Cart
          </button>
          </Link>
          <button
            className={` ${
              isDisabled ? "bg-gray-300 cursor-not-allowed" : "blue-gradient"
            } rounded-full  font-poppins w-full  hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]`}
            disabled={isDisabled}
            onClick={handleProceed}
          >
            <span>Proceed to Checkout</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormV2;
