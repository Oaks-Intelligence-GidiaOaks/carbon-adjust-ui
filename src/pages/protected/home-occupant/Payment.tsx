import PaymentForm from "@/components/containers/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm amount={1000} />
  </Elements>
);

export default Payment;
