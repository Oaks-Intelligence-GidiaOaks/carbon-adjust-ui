import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import card from "@/assets/card.svg"
import klarna from "@/assets/Klarna.svg"
import wallet from "@/assets/wallet.svg"


// Define types for the payment details
type PaymentDetails = {
  card: { amount: string; percentage: number };
  klarna: { amount: string; percentage: number };
  restrictedWallet: { amount: string; percentage: number; balance: number };
  unrestrictedWallet: { amount: string; percentage: number; balance: number };
};

// Define the type for the props, including onClick
type ComboPaymentModalProps = {
  onClick: () => void;
};

const ComboPaymentModal: React.FC<ComboPaymentModalProps> = ({ onClick }) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    card: { amount: "", percentage: 0 },
    klarna: { amount: "", percentage: 0 },
    restrictedWallet: { amount: "", percentage: 0, balance: 5000 },
    unrestrictedWallet: { amount: "", percentage: 0, balance: 5000 },
  });

  // Update the function to accept specific keys
  const handleSliderChange = (key: keyof PaymentDetails, value: number) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [key]: { ...prev[key], percentage: value },
    }));
  };

  // Update the function to accept specific keys
  const handleInputChange = (key: keyof PaymentDetails, value: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [key]: { ...prev[key], amount: value },
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] max-w-full h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Checkout Details</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClick}>
            <BsX size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <p className="text-sm text-gray-600">
            To process this application, select the order in which you want your
            customers to purchase this product.
          </p>

          {/* Payment Sections */}
          {[
            { key: "card", label: "Card", icon: `${card}` },
            { key: "klarna", label: "Klarna", icon: `${klarna}`},
            { key: "restrictedWallet", label: "Restricted Wallet", icon: `${wallet}` },
            {
              key: "unrestrictedWallet",
              label: "Unrestricted Wallet",
              icon: `${wallet}`,
            },
          ].map((method) => (
            <div
              key={method.key}
              className="border rounded-md p-4 space-y-2 bg-gray-50"
            >
              <div className="items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                  <img src={method.icon} className=" text-white flex items-center justify-center "/>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 mt-2"
                    placeholder="Enter amount"
                    value={
                      paymentDetails[method.key as keyof PaymentDetails].amount
                    }
                    onChange={(e) =>
                      handleInputChange(
                        method.key as keyof PaymentDetails,
                        e.target.value
                      )
                    }
                  />
                </div>
                {method.label.includes("Wallet") && (
                  <p className="text-sm text-end mt-3 text-gray-500">
                    Balance: £
                    {"balance" in
                    paymentDetails[method.key as keyof PaymentDetails]
                      ? (
                          paymentDetails[
                            method.key as keyof PaymentDetails
                          ] as {
                            balance: number;
                          }
                        ).balance
                      : 0}
                  </p>
                )}
              </div>

              <div className="flex items-center mt-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={
                    paymentDetails[method.key as keyof PaymentDetails]
                      .percentage
                  }
                  onChange={(e) =>
                    handleSliderChange(
                      method.key as keyof PaymentDetails,
                      Number(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="ml-2 text-sm">
                  {
                    paymentDetails[method.key as keyof PaymentDetails]
                      .percentage
                  }
                  %
                </span>
              </div>
              <div className="flex justify-between mr-5 text-xs text-gray-500">
                <span>Min</span>
                <span>20%</span>
                <span>40%</span>
                <span>60%</span>
                <span>80%</span>
                <span>Max</span>
              </div>
            </div>
          ))}

          <div>
            <p className="text-right text-sm ml-20 text-[#6B6A6A]">
              <span className="text-[#0B8DFF]">*</span> Adjust slider to set
              percentage of coins you wish to transfer to your cash wallet
              balance.
            </p>
          </div>

          {/* Total and Deficit */}
          <div className="flex justify-between border-t p-2 text-lg font-semibold mt-4">
            <p>Total</p>
            <p>£700.00</p>
          </div>
          <div className="flex justify-between text-lg font-semibold text-red-500">
            <p>Deficit</p>
            <p>- £700.00</p>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white p-6 ">
          <button
            className="w-full py-3 rounded-full blue-gradient text-white font-medium hover:bg-blue-600"
            onClick={() => alert("Proceeding with payment")}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboPaymentModal;
