// src/components/PaymentForm.js
import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { initiatePayment } from "@/services/homeOwner";

const PaymentForm = (_: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  const createPaymentIntent: any = useMutation({
    mutationKey: ["create-payment-intent"],
    mutationFn: (iData: { orderId: string }) => initiatePayment(iData),
    onSuccess: (sx: any) => {
      console.log(sx, "success");
      // setClientSecret(sx.clientSecret)

      toast.success("intent created succcesfully");
    },
    onError: (ex: any) => {
      toast.error("error occurred...");
    },
  });

  useEffect(() => {
    // Create PaymentIntent when the component mounts
    createPaymentIntent.mutate({
      orderId: "667db8f44e0eb0e8e4578fc4",
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement!,
        },
      }
    );

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentIntent]", paymentIntent);
      // Handle successful payment here
    }
  };

  if (loading) {
    return <div>Loading payment form...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement onReady={() => setLoading(false)} />
      <button className="" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
