import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaSpinner, FaTimes } from "react-icons/fa";
import ComboPaymentModal from "./ComboModal";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import card from "@/assets/card.svg";
import wallet from "@/assets/wallet.svg";
import klarna from "@/assets/Klarna.svg";
import Payment from "@/pages/protected/home-occupant/Payment";
import { getRestrictedWallet, makePayment } from "@/services/homeOwner";
import { useParams } from "react-router-dom"; // Import useParams
import { useQuery } from "@tanstack/react-query";
import { WalletType } from "@/interfaces/transaction.interface";

interface PaymentMethodProps {
  selectedTab: "single" | "combo";
  selectedPayment: "card" | "klarna" | "Wallet"| "" | string;
  setSelectedTab: (tab: "single" | "combo") => void;
  setSelectedPayment: React.Dispatch<React.SetStateAction<"klarna" | "card" | "Wallet"| "" | string>>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedTab,
  selectedPayment,
  setSelectedTab,
  setSelectedPayment,
}) => {
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const { orderId } = useParams();

  // Fetch wallet data using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restricted-wallet"],
    queryFn: () => getRestrictedWallet(WalletType.CASH_WALLET),
  });

  const walletData = data?.data;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderId) {
      toast.error("Order ID is missing!");
      return;
    }

    const balanceType =
      paymentType === "restricted"
        ? "restrictedMonetizedCashBenefitBalance"
        : "unrestrictedMonetizedCashBenefitBalance";

    setLoading(true);
    try {
      await makePayment(orderId, "Wallet", undefined, balanceType);
      toast.success("Payment processed successfully!");
      setShowModal(true);
    } catch (error) {
      const typedError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        typedError.response?.data?.message || "An unexpected error occurred.";
      toast.error(`Payment failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNextClick = () => {
    if (selectedPayment) {
      setShowSingleForm(true);
    } else {
      toast.error("Please select a payment method.");
    }
  };

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
                { id: "card", label: "Pay with Card ", icon: `${card}` },
                { id: "klarna", label: "Pay with  Klarna", icon: `${klarna}` },
                {
                  id: "Wallet",
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
          {selectedPayment === "Wallet" ? (
            <div className="mt-6 p-6 border rounded-lg bg-white shadow-md">
              <div className="flex justify-between items-center mb-6">
                {isLoading ? (
                  <p>Loading wallet data...</p>
                ) : isError ? (
                  toast.error(
                    "Error fetching wallet data. Please try again later."
                  ) && <p>Error loading wallet data.</p>
                ) : (
                  <>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Unrestricted Wallet Balance
                      </p>
                      <p className="text-lg font-semibold text-blue-600">
                        £{walletData.unrestrictedMonetizedCashBenefitBalance}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Restricted Wallet Balance</p>
                      <p className="text-lg font-semibold text-blue-600">
                        £{walletData.restrictedMonetizedCashBenefitBalance}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <form className="space-y-6 text-sm" onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-2">
                    Select Payment Type
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="unrestricted"
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="text-gray-700">Unrestricted</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="restricted"
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700">Restricted</span>
                    </label>
                  </div>
                </div>


                <button
                  type="submit"
                  className={`w-full py-3 rounded-full font-medium ${
                    loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "blue-gradient text-white hover:bg-blue-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                              <div className="flex items-center justify-center space-x-2">
                                <FaSpinner className="animate-spin" />
                                <span>Processing...</span>
                              </div>
                            ) : (
                              "Proceed"
                            )}
                </button>
              </form>
            </div>
          ) : selectedPayment === "card" ? (
            <div className="mt-6 p-4 border rounded-md bg-white shadow-sm">
              <Payment paymentProps="card" />
            </div>
          ) : (
            <div className="mt-6 p-4 border rounded-md bg-white shadow-sm">
              <Payment paymentProps="klarna" />
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
          <div className="bg-white relative rounded-lg p-6 w-11/12  h-fit max-w-md shadow-lg">
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
              {/* <div className="mt-4 border rounded-full border-blue-500 p-2 flex items-center justify-center gap-3">
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">123456789</span>
                </p>
                <a
                  href="/order-details"
                  className="text-blue-500 text-sm inline-flex items-center"
                >
                  ORDER DETAILS &gt;
                </a>
              </div> */}

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
