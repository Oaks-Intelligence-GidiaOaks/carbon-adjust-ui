import { OrderSummary } from "@/components/reusables/OrderSumary";
import PaymentMethod from "@/components/reusables/PaymentMethod";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

 const Checkout = () => {
  const [selectedTab, setSelectedTab] = useState<"single" | "combo">("single");
  const [selectedPayment, setSelectedPayment] = useState<"klarna" | "card" | "Wallet" | "" | string >("card");  // updated initial state to null

  return (
    <div className="p-6 mx-auto">
      <Link to="/dashboard/cart" className="flex items-center mb-3 text-[#0F172A]">
        <ChevronLeft />
      </Link>
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border-dashed border-2 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Billing Method</h2>
          <div className="bg-[#EBF5FF99] flex gap-2 items-center border-l-4 p-3 my-4 border-[#2E599A]">
            <div>
              <BsInfoCircle className="size-4 text-[#0B8DFF]" />
            </div>
            <p className="text-sm text-[#5C5C5C]">
              You can either use one payment method or the combo method which
              combines two or more payment systems to checkout your purchase.
            </p>
          </div>
          <PaymentMethod
            selectedTab={selectedTab}
            selectedPayment={selectedPayment}
            setSelectedTab={setSelectedTab}
            setSelectedPayment={setSelectedPayment}
          />
        </div>
        <OrderSummary selectedPayment={selectedPayment} />
      </div>
    </div>
  );
};

export default Checkout;

