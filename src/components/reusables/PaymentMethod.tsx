import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import ComboPaymentModal from "./ComboModal";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import card from "@/assets/card.svg";
import klarna from "@/assets/Klarna.svg";
import wallet from "@/assets/wallet.svg";
// import { RootState } from "@/app/store";
// import { initiatePayment } from "@/services/homeOwner";
// import {
//   Elements,
//   PaymentElement,
//   // useStripe,
//   // useElements,
// } from "@stripe/react-stripe-js";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import Payment from "@/pages/protected/home-occupant/Payment";
// import { useMutation } from "@tanstack/react-query";

// import { Oval } from "react-loader-spinner";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import SocketService from "@/repository/socket";
// import {
//   IOrderPaymentEventPayload,
//   IOrderPaymentFailureEventPayload,
//   IOrderPaymentSuccessEventPayload,
//   MonitoringEvent,
//   SubLevelEvent,
// } from "@/interfaces/events.interface";

// Load your publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

interface PaymentMethodProps {
  selectedTab: "single" | "combo";
  selectedPayment: string;
  setSelectedTab: (tab: "single" | "combo") => void;
  setSelectedPayment: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedTab,
  selectedPayment,
  setSelectedTab,
  setSelectedPayment,
}) => {
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // Show the modal on form submission
  };

  const handleNextClick = () => {
    if (selectedPayment) {
      setShowSingleForm(true);
    } else {
      toast.error("Please select a payment method.");
    }
  };

  const [flexibleWallet, setFlexibleWallet] = useState<string>("");
  const [restrictedWallet, setRestrictedWallet] = useState<string>("");

  const total = 700; // Example total
  const deficit = -300; // Example deficit

  // const { user } = useSelector((state: RootState) => state.user);
  // const { orderId } = useParams();
  // const stripe = useStripe!();
  // const elements = useElements();
  // // @ts-ignore
  // const [errorMessage, setErrorMessage] = useState<any>(null);
  // const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // const { product, order } = useSelector((state: RootState) => state);
  // const { protocol, hostname, port } = window.location;
  // const redirectUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;

  // const createPaymentIntent: any = useMutation({
  //   mutationKey: ["create-payment-intent"],
  //   mutationFn: (iData: { orderId: string }) => initiatePayment(iData),
  //   onError: (_: any) => {
  //     toast.error(`Payment could not be initiated.. Please try again`);
  //     setBtnLoading(false);
  //   },
  // });

  // let orderPaymentPayload: IOrderPaymentEventPayload = {
  //   orderId: orderId as string,
  //   userId: user?._id as string,
  //   time: Date.now(),
  //   eventName: SubLevelEvent.ORDER_PAYMENT_EVENT,
  //   amount: Number(order.price),
  // };

  // let orderPaymentFailurePayload: IOrderPaymentFailureEventPayload = {
  //   ...orderPaymentPayload,
  //   success: false,
  // };

  // let orderPaymentSuccessPayload: IOrderPaymentSuccessEventPayload = {
  //   ...orderPaymentPayload,
  //   success: true,
  // };

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();

  //   if (elements == null) {
  //     return;
  //   }

  //   setBtnLoading(true);

  //   // Trigger form validation and wallet collection
  //   const { error: submitError } = await elements.submit();

  //   if (submitError) {
  //     // Show error to your customer
  //     // @ts-ignore
  //     setErrorMessage(submitError.message);
  //     setBtnLoading(false);
  //     return;
  //   }

  //   // ORDER_PAYMENT_EVENT
  //   SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, orderPaymentPayload);

  //   const { data: intentData } = await createPaymentIntent.mutateAsync({
  //     orderId,
  //   });

  //   const { error } = await stripe!.confirmPayment({
  //     elements,
  //     clientSecret: intentData.clientSecret,
  //     confirmParams: {
  //       return_url: `${redirectUrl}/dashboard/payment/success?schedule=${!!product.hasSchedule}`,
  //     },
  //   });

  //   if (error) {
  //     // This point will only be reached if there is an immediate error when
  //     // confirming the payment. Show error to your customer (for example, payment
  //     // details incomplete)

  //     // ORDER_FAILURE_EVENT
  //     SocketService.emit(
  //       MonitoringEvent.NEW_SUBLEVEL_EVENT,
  //       orderPaymentFailurePayload
  //     );

  //     setBtnLoading(false);
  //     // setErrorMessage(error.message);
  //   } else {
  //     // ORDER_SUCCESS_EVENT
  //     SocketService.emit(
  //       MonitoringEvent.NEW_SUBLEVEL_EVENT,
  //       orderPaymentSuccessPayload
  //     );

  //     setBtnLoading(false);

  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

  return (
    <div>
      {/* Tabs for single or combo payment */}
      <div className="flex space-x-4 mb-6 bg-[#F8F8F8] p-3">
        <button
          className={`flex-1 py-2 px-4 rounded-md text-center font-medium ${
            selectedTab === "single"
              ? "bg-white text-[#667085]"
              : "text-[#667085]"
          }`}
          onClick={() => {
            setSelectedTab("single");
            setShowSingleForm(false); // Reset form visibility
            setSelectedPayment(""); // Reset selected payment
          }}
        >
          Single Payment
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-center font-medium ${
            selectedTab === "combo"
              ? "bg-white text-[#667085]"
              : "text-[#667085]"
          }`}
          onClick={() => {
            setSelectedTab("combo");
            setShowSingleForm(false); // Reset form visibility
            setSelectedPayment(""); // Reset selected payment
          }}
        >
          Combo Payment
        </button>
      </div>

      {/* Back Chevron Button */}
      {showSingleForm && (
        <button
          className="flex items-center space-x-2 mb-4 text-gray-600 hover:text-gray-800"
          onClick={() => setShowSingleForm(false)} // Reset to initial screen
        >
          <FaChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {!showSingleForm ? (
        <div>
          {selectedTab === "single" && (
            <div className="space-y-4">
              {/* Payment options */}
              {[
                { id: "card", label: "Pay with card", icon: `${card}` },
                { id: "klarna", label: "Pay with Klarna", icon: `${klarna}` },
                {
                  id: "wallet",
                  label: "Pay with Cash Wallet",
                  icon: `${wallet}`,
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`border rounded-md p-4 flex items-center justify-between space-x-4 cursor-pointer ${
                    selectedPayment === method.id
                      ? "border-blue-500 bg-[#E8F3FC]"
                      : "border-gray-300 bg-[#F6FAFD]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    className="hidden"
                    onChange={() => setSelectedPayment(method.id)}
                  />
                  <div className="flex items-center gap-3">
                    <img
                      src={method.icon}
                      className=" h-7 w-10 text-white flex items-center justify-center "
                    />
                    <p className="text-sm font-medium">{method.label}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <BsCheckCircleFill className="text-[#0E89F7]" />
                  )}
                </label>
              ))}
              <button
                className="w-full blue-gradient text-white py-2 px-4 rounded-full mt-4 font-medium"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {selectedPayment === "wallet" ? (
            <div className="mt-6 p-4 border rounded-md bg-white shadow-sm">
              <form className="space-y-6 text-sm" onSubmit={handleFormSubmit}>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 2a4 4 0 100 8 4 4 0 000-8z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={flexibleWallet}
                      placeholder="£5"
                      onChange={(e) => setFlexibleWallet(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-end text-[#333333]mt-1">
                      Flexible Wallet Balance: £
                      <span className="font-semibold">5000</span>
                    </p>
                  </div>
                </div>

                {/* Restricted Wallet Input */}
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 2a4 4 0 100 8 4 4 0 000-8z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={restrictedWallet}
                      placeholder="£25"
                      onChange={(e) => setRestrictedWallet(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-end text-[#333333] mt-1">
                      Restricted Wallet Balance: £
                      <span className="font-semibold">5000</span>
                    </p>
                  </div>
                </div>

                {/* Total and Deficit */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="">Total</p>
                    <p className="text-xl font-semibold">£{total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="">Deficit</p>
                    <p className="text-xl font-semibold text-red-500">
                      £{deficit.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="w-full blue-gradient text-white py-3 px-4 rounded-full font-medium"
                >
                  Next
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-6 p-4 border rounded-md bg-white shadow-sm">
              <Payment />
              {/* </Elements> */}
            </div>
          )}
        </div>
      )}

      {selectedTab === "combo" && (
        <div className="space-y-4">
          <ComboPaymentModal />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-[black] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white relative rounded-lg p-6 w-11/12  h-[70vh] max-w-md shadow-lg">
            <button
              className="absolute top-2 right-4 text-[#231F20] hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <div className="text-center">
              {/* Success Icon */}
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#41D195] border-8 border-[#C1FFE5] flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h3 className="text-lg font-semibold">Congratulations</h3>
              <p className="text-sm text-gray-600 mt-2">
                Your order has been placed and will be delivered to you soon.
              </p>

              {/* Order Details */}
              <div className="mt-4 border rounded-full border-blue-500 p-2 flex items-center justify-center gap-3">
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">123456789</span>
                </p>
                <a
                  href="/order-details"
                  className="text-blue-500 text-sm inline-flex items-center"
                >
                  ORDER DETAILS &gt;
                </a>
              </div>

              {/* Continue Button */}
              <button
                className="mt-6 w-full blue-gradient text-white py-2 px-4 rounded-full font-medium"
                onClick={() => setShowModal(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
