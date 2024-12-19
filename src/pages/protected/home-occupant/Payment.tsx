
// import PaymentForm from "@/components/containers/PaymentForm";
import { RootState } from "@/app/store";
import { makePayment } from "@/services/homeOwner";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";
// import { useMutation } from "@tanstack/react-query";
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


type CheckoutFormProps = {
  method: ("card" | "klarna");
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ method }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { orderId } = useParams<{ orderId: string }>();
  const stripe = useStripe!();
  const elements = useElements();
  // @ts-ignore
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const { product, order } = useSelector((state: RootState) => state);
  const { protocol, hostname, port } = window.location;
  const redirectUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  

  // const createPaymentIntent = useMutation({
  //   mutationKey: ["create-payment-intent"],
  //   mutationFn: (iData: { orderId: string[] }) => initiatePayment(iData),
  //   onError: () => {
  //     toast.error("Payment could not be initiated. Please try again.");
  //     setBtnLoading(false);
  //   },
  // });
  
 



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

//   const handleSubmit = async (event: any) => {
//   event.preventDefault();

//   if (elements == null) {
//     return;
//   }

//   setBtnLoading(true);

//   // Validate orderId
//   if (!orderId) {
//     toast.error("Order ID is missing or invalid.");
//     setBtnLoading(false);
//     return;
//   }

//   // Convert orderId to an array
//   const orderIds = [orderId]; // Convert single string to array
//   console.log('order', orderIds)
//   try {
//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();

//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       setBtnLoading(false);
//       return;
//     }

//     // Emit payment event
//     SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, orderPaymentPayload);

//     // Initiate payment with the array
//     const { data: intentData } = await createPaymentIntent.mutateAsync({
//       orderId: orderIds,
//     });
    

//     // Confirm payment with Stripe
//     const { error } = await stripe!.confirmPayment({
//       elements,
//       clientSecret: intentData.clientSecret,
//       confirmParams: {
//         return_url: `${redirectUrl}/dashboard/payment/success?schedule=${!!product.hasSchedule}`,
//       },
//     });

//     if (error) {
//       // Emit failure event
//       SocketService.emit(
//         MonitoringEvent.NEW_SUBLEVEL_EVENT,
//         orderPaymentFailurePayload
//       );

//       setBtnLoading(false);
//       setErrorMessage(error.message);
//     } else {
//       try {
//         // Call makePayment after successful confirmation
//         const paymentResponse = await makePayment(orderIds, "WALLET");
//         if (paymentResponse.success) {
//           // Emit success event
//           SocketService.emit(
//             MonitoringEvent.NEW_SUBLEVEL_EVENT,
//             orderPaymentSuccessPayload
//           );
//           toast.success("Payment completed successfully!");
//         } else {
//           toast.error("Payment was successful, but order processing failed.");
//         }
//       } catch (paymentError) {
//         toast.error(
//           "Payment was confirmed, but order processing encountered an error."
//         );
//       }

//       setBtnLoading(false);
//     }
//   } catch (error) {
//     toast.error("An error occurred while processing your payment.");
//     setBtnLoading(false);
//   }
// };

const handleSubmit = async (event: any) => {
  event.preventDefault();

  if (elements == null) {
    return;
  }

  setBtnLoading(true);

  // Validate orderId
  if (!orderId) {
    toast.error("Order ID is missing or invalid.");
    setBtnLoading(false);
    return;
  }

  try {
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      setBtnLoading(false);
      return;
    }

    // Retrieve payment method type dynamically
    const paymentType = method;

    console.log("Selected payment type:", paymentType);

    // Emit payment event
    SocketService.emit(MonitoringEvent.NEW_SUBLEVEL_EVENT, orderPaymentPayload);

    // Call the API with the dynamically selected payment type
    const paymentResponse = await makePayment(orderId, paymentType);

    if (!paymentResponse || !paymentResponse.data?.clientSecret) {
      toast.error("Payment initiation failed. No clientSecret returned.");
      setBtnLoading(false);
      return;
    }

    const clientSecret = paymentResponse.data.clientSecret;

    // Confirm payment with Stripe using the clientSecret returned from makePayment
    const { error: stripeError } = await stripe!.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${redirectUrl}/dashboard/payment/success?schedule=${!!product.hasSchedule}`,
      },
    });

    if (stripeError) {
      // Emit failure event
      SocketService.emit(
        MonitoringEvent.NEW_SUBLEVEL_EVENT,
        orderPaymentFailurePayload
      );
      setBtnLoading(false);
      setErrorMessage(stripeError.message);
    } else {
      // Emit success event
      SocketService.emit(
        MonitoringEvent.NEW_SUBLEVEL_EVENT,
        orderPaymentSuccessPayload
      );
      toast.success("Payment completed successfully!");
    }
    
    setBtnLoading(false);
  } catch (error: any) {
    // Check if the error has a response object
    const serverErrorMessage =
      error?.response?.data?.message || "An error occurred while processing your payment.";
    toast.error(serverErrorMessage);
    setBtnLoading(false);
  }
};







  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <div className="">
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

      <form id="payment-form" onSubmit={handleSubmit} className="">
        <PaymentElement id="payment-element" options={paymentElementOptions} />

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
              `Pay`
            )}
          </button>
        </div>

        {/* Show error message to your customers */}
        {/* {errorMessage && <div>{errorMessage}</div>} */}
      </form>
    </div>
  );
};

type Props = {
    paymentProps: "card" | "klarna";
};



const Payment = (props: Props) => {

  const options = {
    mode: "payment",
    amount: 4000,
    currency: "gbp",
    paymentMethodTypes: [props.paymentProps],
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
  <div className="px-4  mt-6 mx-auto">
    <Elements
      stripe={stripePromise}
      // @ts-ignore
      options={options}
    >
      <CheckoutForm method={props.paymentProps} />
    </Elements>
  </div>
  )
};

export default Payment;
