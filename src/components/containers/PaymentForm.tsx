// src/components/PaymentForm.js
import { useState, useEffect } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { baseURL } from "@/constants/api";

const PaymentForm = (props: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  const stripeApiUrl = `${baseURL}/create-payment-intent`;

  useEffect(() => {
    // Create PaymentIntent when the component mounts
    fetch(stripeApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: props.amount }), // Amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [props.amount]);

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
