import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
// import ProductCard from "./ProductCard";
import products from "../../dummy/products.json";
import Backdrop from "./Backdrop";
import { useState } from "react";
import EnergyPackage from "./EnergyPackage";
import { Input } from "../ui";
import SelectInput from "../ui/SelectInput";
import { SelectItem } from "@/types/formSelect";
import { SingleValue } from "react-select";

type Props = {};

const DescriptionSection = (props: {}) => (
  <div>
    <div className="flex-center justify-between w-full  border-b py-4 px-7">
      <h2 className="font-[600] text-lg">Home Energy Package</h2>

      <span>
        <GrClose />
      </span>
    </div>

    <div className="py-[15px] flex flex-col gap-[15px]">
      <h2 className="text-center font-[600] text-lg ">Checkout</h2>

      <div className="w-[262px] mx-auto">
        <EnergyPackage {...products[0]} />
      </div>

      <div className="space-y-3 px-5 font-inter">
        <h2 className="font-[600] text-base text-[#141718]">
          Product Description
        </h2>

        <p className="font-[500] text-sm">
          Lorem ipsum dolor sit amet consectetur. Ultrices ac elementum neque
          fermentum. Vitae nisl rhoncus varius odio felis egestas. Pretium
          porttitor orci diam magna libero faucibus orci ultricies magna. Dolor
          libero malesuada sit vitae. Velit leo vehicula viverra mauris ut eget
          risus massa porta. A.
        </p>

        <button className="rounded-[12px] font-poppins w-full blue-gradient text-center text-white hover:bg-gradient-to-t h-[46px]">
          <span>Proceed</span>
        </button>
      </div>
    </div>
  </div>
);

const ProductForm = () => {
  let formProps = {
    label: "Package",
    labelClassName: "pb-[10px]",
    wrapperClassName: "",
    name: "",
    // register: "",
    required: "",
    error: "",
    inputClassName: "border p-3 bg-[#E4E7E8]",
    placeholder: "Window Retrofitting",
  };

  const dropdownProps = {
    options: [],
    className: "",
    value: { label: "value", value: "value" },
    label:
      "How much are you willing to spend on your retrofit journey in the next year?",
    onChange: (newValue: SingleValue<SelectItem>) => {},
    placeholder: "",
  };

  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7">
        <h2 className="font-[600] text-lg">Home Energy Package</h2>

        <span>
          <GrClose />
        </span>
      </div>

      <div className="w-5/6 mx-auto">
        <h6 className="font-[400] text-sm py-[22px]">
          Please provide the below details to enable us complete your order for
          this product.
        </h6>

        <div className="flex flex-col gap-4">
          <Input {...formProps} />
          <Input {...formProps} />
          <Input {...formProps} />

          {/* tel input */}

          <div className="flex flex-col gap-[8px]">
            <p className="font-[400] text-sm text-[#333333]">
              Will you need any other product?
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex-center gap-[6px]">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="bg-[#0E89F7] h-4 w-4"
                />

                <span>Yes</span>
              </div>

              <div className="flex-center gap-[6px]">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="bg-[#0E89F7] h-4 w-4"
                />

                <span>No</span>
              </div>
            </div>

            <div>
              <SelectInput {...dropdownProps} />
            </div>

            <button className="rounded-[12px] mt-[40px] font-poppins w-full blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]">
              <span>Proceed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = () => {
  return (
    <div>
      <div className="flex-center font-poppins justify-between w-full  border-b py-4 px-7">
        <div className="flex-center gap-[13px]">
          <IoIosArrowRoundBack />
          <h2 className="font-[600] text-lg">Check Out</h2>
        </div>

        <span>
          <GrClose />
        </span>
      </div>

      <div className="flex flex-col gap-[32px] w-5/6 mx-auto">
        <h2 className="font-[600] text-lg">Order Summary</h2>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2"> Price $: </span>
          <span className="font-[400] text-base w-1/2 pl-2"> 199 </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2 "> Package : </span>
          <span className="font-[400] text-base w-1/2 pl-2">
            Window Retrofitting{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2"> Address: </span>
          <span className="font-[400] text-base w-1/2 pl-2">
            45 Forth Avenue, Bristol, United Kingdom
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2"> Email Address: </span>
          <span className="font-[400] text-base w-1/2 pl-2">
            {" "}
            demoperson@gmail.com{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2"> Phone Number: </span>
          <span className="font-[400] text-base w-1/2 pl-2">
            {" "}
            +44 4576 87*****{" "}
          </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2">
            Will you need any other product?:
          </span>
          <span className="font-[400] text-base w-1/2 pl-2"> Yes </span>
        </div>

        <div className="flex-start">
          <span className="font-[600] text-base w-1/2">
            How much are you willing to spend on your retrofit journey in the
            next year?:
          </span>
          <span className="font-[400] text-base w-1/2 pl-2"> $25 </span>
        </div>

        <button className="rounded-[12px] mt-[40px] font-poppins w-full blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]">
          <span>Proceed to pay</span>
        </button>
      </div>
    </div>
  );
};

const PaymentSuccessful = () => {
  return (
    <div className="flex flex-col items-center h-[80vh]">
      <div className="flex-center font-poppins justify-end w-full  border-b py-4 px-7">
        <span>
          <GrClose />
        </span>
      </div>

      <div className="my-auto flex flex-col items-center gap-[14px] ">
        <h2 className="font-[600] text-base">Payment Successful</h2>

        <img
          src="/assets/icons/tick-circle.svg"
          className="h-[150px] w-[150px]"
          alt=""
        />
      </div>

      <button className="rounded-[12px] mt-[40px] font-poppins w-4/5 mx-auto blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]">
        <span>Continue</span>
      </button>
    </div>
  );
};

const ProductCheckout = (props: Props) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <Backdrop setShow={setShow} show={show}>
      <div className="max-w-[480px] max-h-[92vh] overflow-y-scroll pb-[30px]">
        <DescriptionSection />
        <ProductForm />
        <OrderSummary />
        <PaymentSuccessful />
      </div>
    </Backdrop>
  );
};

export default ProductCheckout;
