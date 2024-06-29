// import PaymentForm from "@/components/containers/PaymentForm";
import { RootState } from "@/app/store";
import { initiatePayment } from "@/services/homeOwner";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Load your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const { orderId } = useParams();
  const stripe = useStripe!();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const { product } = useSelector((state: RootState) => state);

  const createPaymentIntent: any = useMutation({
    mutationKey: ["create-payment-intent"],
    mutationFn: (iData: { orderId: string }) => initiatePayment(iData),
    onError: (_: any) => {
      toast.error("error occurred...");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // Show error to your customer
      // @ts-ignore
      setErrorMessage(submitError.message);
      return;
    }

    const { data: intentData } = await createPaymentIntent.mutateAsync({
      orderId,
    });

    // console.log(!!product.hasSchedule);

    // return;

    const { error } = await stripe!.confirmPayment({
      elements,
      clientSecret: intentData.clientSecret,
      confirmParams: {
        return_url: `http://localhost:5173/dashboard/payment/success?schedule=${!!product.hasSchedule}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log(error, "error");
      // toast.error(error?.message);
      // setErrorMessage(error.message);
    } else {
      toast.success("final stage reached");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div className="mx-auto w-full my-6">
        <button
          className="border p-2 px-6 text-sm blue-gradient text-white  rounded-md w-full"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </div>

      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
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
  <div className="px-4 md:w-4/5 mx-auto">
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
