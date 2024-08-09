// import PaymentForm from "@/components/containers/PaymentForm";
import { RootState } from "@/app/store";
import { initiatePayment } from "@/services/homeOwner";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { CiLock } from "react-icons/ci";

import SocketService from "@/repository/socket";
import {
  IOrderPaymentEventPayload,
  IOrderPaymentFailureEventPayload,
  IOrderPaymentSuccessEventPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";

// Load your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { orderId } = useParams();
  const stripe = useStripe!();
  const elements = useElements();
  // @ts-ignore
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const { product, order } = useSelector((state: RootState) => state);
  const { protocol, hostname, port } = window.location;
  const redirectUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;

  const createPaymentIntent: any = useMutation({
    mutationKey: ["create-payment-intent"],
    mutationFn: (iData: { orderId: string }) => initiatePayment(iData),
    onError: (_: any) => {
      toast.error(`Payment could not be initiated.. Please try again`);
      setBtnLoading(false);
    },
  });

  let orderPaymentPayload: IOrderPaymentEventPayload = {
    orderId: orderId as string,
    userId: user?._id as string,
    time: Date.now(),
    eventName: SubLevelEvent.ORDER_PAYMENT_EVENT,
    amount: Number(order.price),
  };

  let orderPaymentFailurePayload: IOrderPaymentFailureEventPayload = {
    ...orderPaymentPayload,
    success: false,
  };

  let orderPaymentSuccessPayload: IOrderPaymentSuccessEventPayload = {
    ...orderPaymentPayload,
    success: true,
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    setBtnLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // Show error to your customer
      // @ts-ignore
      setErrorMessage(submitError.message);
      setBtnLoading(false);
      return;
    }

    // ORDER_PAYMENT_EVENT
    SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, orderPaymentPayload);

    const { data: intentData } = await createPaymentIntent.mutateAsync({
      orderId,
    });

    const { error } = await stripe!.confirmPayment({
      elements,
      clientSecret: intentData.clientSecret,
      confirmParams: {
        return_url: `${redirectUrl}/dashboard/payment/success?schedule=${!!product.hasSchedule}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)

      // ORDER_FAILURE_EVENT
      SocketService.emit(
        MonitoringEvent.NEW_SUBLEVEL_EVENT,
        orderPaymentFailurePayload
      );

      setBtnLoading(false);
      // setErrorMessage(error.message);
    } else {
      // ORDER_SUCCESS_EVENT
      SocketService.emit(
        MonitoringEvent.NEW_SUBLEVEL_EVENT,
        orderPaymentSuccessPayload
      );

      setBtnLoading(false);

      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className="border px-3 py-6  md:p-6 md:px-6 bg-white shadow-lg rounded-xl bg-gradient-to-b from-[#abbaab34] to-[#ffffff]">
      <div className="flex-center justify-between mb-8">
        <div className="flex-center gap-x-2">
          <MdOutlinePayment size={20} color="#1CB5E0" />
          <h2 className=" uppercase font-[600] text-xl bg-gradient-to-r from-[#000046] to-[#1CB5E0] bg-clip-text text-transparent font-poppins ">
            Checkout
          </h2>
        </div>

        <div className="flex-center gap-1">
          <CiLock />
          <span className="font-[400] italic text-gray-400">
            Powered by stripe
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="">
        <PaymentElement />

        <div className="mx-auto w-full my-6 font-[600] font-poppins">
          <button
            className={`${
              !stripe || !elements || btnLoading
                ? "!bg-gray-400"
                : "blue-gradient"
            } border p-3 px-6 text-sm  text-white  rounded-md w-full grid place-items-center`}
            type="submit"
            disabled={!stripe || !elements || btnLoading}
          >
            {btnLoading ? (
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
              `Pay ${product.currency} ${order.price}`
            )}
          </button>
        </div>

        {/* Show error message to your customers */}
        {/* {errorMessage && <div>{errorMessage}</div>} */}
      </form>
    </div>
  );
};

const options = {
  mode: "payment",
  amount: 4000,
  currency: "gbp",
  paymentMethodTypes: ["card"],
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Payment = () => (
  <div className="px-4 md:w-[65%] mt-6 mx-auto">
    <Elements
      stripe={stripePromise}
      // @ts-ignore
      options={options}
    >
      <CheckoutForm />
    </Elements>
  </div>
);

export default Payment;
