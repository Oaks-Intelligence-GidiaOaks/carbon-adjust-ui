import { RootState } from "@/app/store";
import { CountryRegionDropdown, Input } from "@/components/ui";
import {
  updateAddress,
  updatePhone,
  updateReason,
  updatepPostCode,
  updateCity,
  updateCountry,
  updatePrice,
  updateOrderId,
} from "@/features/orderSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Phoneinput from "@/components/ui/PhoneInput";
import { MdArrowBack } from "react-icons/md";
import toast from "react-hot-toast";
import { Country, State } from "country-state-city";
import { useMutation } from "@tanstack/react-query";
import { createNewOrder } from "@/services/homeOwner";
import { useNavigate } from "react-router-dom";
import SocketService from "@/repository/socket";
import {
  IInitializeEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";
import { IResponse } from "@/interfaces/orderData.interface";
import { FaSpinner } from "react-icons/fa";


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
    responses?: IResponse[];
    _id?: string;
  };

const GrantProductForm = (props: {
  setStage: Dispatch<SetStateAction<number>>;
  setShowcheckout: Dispatch<SetStateAction<boolean>>;
  setShowCancel: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, order, user }: RootState = useSelector(
    (state: RootState) => state
  );
  const [loading, setLoading] = useState(false);
  let countryData = Country.getAllCountries();
  const [statesList, setStatesList] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setStatesList(
      State.getStatesOfCountry(order.customerAddress.country?.value || "").map(
        (state) => ({
          label: state.name,
          value: state.isoCode,
        })
      )
    );

    dispatch(updateCity({ label: "", value: "" }));
  }, [order.customerAddress.country?.value, dispatch]);

  const { responses, _id, customerAddress, ...rest } = order;

  const isFormValues =
    Object.values({ ...rest }).filter((it: any) => it.toString().length < 1)
      .length > 0;

  const isLocation =
    customerAddress.country.value.length > 0 &&
    customerAddress.cityOrProvince.value.length > 0 &&
    customerAddress.firstLineAddress.length > 0 &&
    customerAddress.zipcode.length > 0;

  // Define the mutation
  const createOrder = useMutation({
    mutationKey: ["create-order"],
    mutationFn: (orderData: IOrder) => createNewOrder(orderData),
    onSuccess: (response: any) => {
      dispatch(updateOrderId(response.data._id));
      dispatch(updatePrice(response.data.price));

      // Emit socket event
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
      SocketService.emit(
        MonitoringEvent.NEW_SUBLEVEL_EVENT,
        initializeEventPayload
      );
      navigate(`/dashboard/orders`);
      toast.success("Grant application submitted successfully!");
      setLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred.");
      setLoading(false)
    },
  });

  const isDisabled =
    product.questions.filter((item) => item.isRequired).length !==
      responses.filter((item) => item.isRequired).length ||
    isFormValues ||
    !isLocation;

  // Handle form submission
  const handleApply = () => {

    const newOrder: IOrder = {
      ...order,
      package: product._id,
      price:0,
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
      <div className="flex-center font-poppins justify-between w-full border-b py-4 px-7 sticky top-0 z-20 bg-white">
        <MdArrowBack size={20} onClick={() => props.setStage(1)} />
        <div className="flex flex-col">
        <h2 className="font-[600] text-lg">{product.category?.name}</h2>
        <p className="text-xs text-[#A2A2A2]"> Min. {product.currency}{product.minAmount} - Max {product.currency}{product.maxAmount}</p>
        </div>
        <span onClick={() => props.setShowCancel(true)}>
          <GrClose />
        </span>
      </div>

      <div className="w-5/6 mx-auto">
        <h6 className="font-[400] text-sm py-[22px]">
          Please provide the below details to enable us to complete your order
          for this product.
        </h6>

        <div className="flex flex-col gap-4">
          {/* Reason for applying */}
          <Input
            key={1}
            label="Reason for applying"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name="reasonForApplying"
            error=""
            inputClassName="border p-3 bg-gray-100"
            placeholder="Enter reason"
            onChange={(e) => dispatch(updateReason(e.target.value))}
            value={order.reasonForApplying}
          />

          {/* Name */}
          <Input
            key={80}
            label="Name"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name="customerName"
            error=""
            inputClassName="border p-3 bg-gray-100"
            value={user.user?.name || ""}
            readOnly
          />

          {/* Email */}
          <Input
            key={3}
            label="Email address"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name="customerEmail"
            error=""
            inputClassName="border p-3 bg-gray-100"
            value={user.user?.email || ""}
            readOnly
          />

          {/* First Line of Address */}
          <Input
            key={4}
            label="First Line of address"
            required
            className=""
            labelClassName="pb-[10px]"
            wrapperClassName=""
            name="firstLineAddress"
            placeholder="Enter first line of address"
            error=""
            inputClassName="border p-3 bg-gray-100"
            value={order.customerAddress.firstLineAddress}
            onChange={(e) => dispatch(updateAddress(e.target.value))}
          />

          {/* Country Dropdown */}
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
            countryChange={(value) => dispatch(updateCountry(value))}
          />

          {/* City/Province Dropdown */}
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

          {/* Zip Code */}
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

          {/* Phone Number */}
          <Phoneinput
            name="tel"
            label="Enter phone number"
            required
            labelClassName="mb-4"
            inputClassName="bg-gray-100 text-[#000000]"
            placeholder="+234"
            value={order.customerPhone}
            onInputChange={(_, __, ___, formattedValue: string) => {
              dispatch(updatePhone(formattedValue));
            }}
          />

          {/* Apply Button */}
        <button
        onClick={handleApply}
        disabled={isDisabled || loading}
        className={`${
          isDisabled || loading ? "bg-gray-300" : "blue-gradient"
        } rounded-[12px] mt-[40px] font-poppins w-full  hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px] grid place-items-center`}
      >
        {loading ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : (
          "Apply"
        )}
      </button>
        </div>
      </div>
    </div>
  );
};

export default GrantProductForm;
