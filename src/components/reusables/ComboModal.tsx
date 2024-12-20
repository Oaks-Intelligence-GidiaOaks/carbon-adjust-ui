import React, { useEffect, useState } from "react";
import card from "@/assets/card.svg";
import wallet from "@/assets/wallet.svg";
import { calculatePaymentTotals, getRestrictedWallet, makePayment } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { WalletType } from "@/interfaces/transaction.interface";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import router from "@/router/router";

type PaymentDetails = {
  card: { amount: string; percentage: number };
  restrictedWallet: { amount: string; percentage: number };
  unrestrictedWallet: { amount: string; percentage: number };
};

const ComboPaymentModal: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const orderIds = orderId ? orderId.split(",") : [];

  const { data: response } = useQuery({
    queryKey: ["payment-totals", "Combination"],
  queryFn: () =>
      calculatePaymentTotals({
        orderIds: orderIds,
        paymentMethod: "Combination",
      }),
  });

  const totalCalculations = response?.data?.totalCalculations || {};
  const totalAmount = totalCalculations?.total || 0;

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    card: { amount: "0", percentage: 100 },
    restrictedWallet: { amount: "0", percentage: 0 },
    unrestrictedWallet: { amount: "0", percentage: 0 },
  });

  useEffect(() => {
    if (totalAmount) {
      setPaymentDetails({
        card: { amount: totalAmount.toString(), percentage: 100 },
        restrictedWallet: { amount: "0", percentage: 0 },
        unrestrictedWallet: { amount: "0", percentage: 0 },
      });
    }
  }, [totalAmount]);


  const [loading, setLoading] = useState(false); // New loading state

  const handleSliderChange = (walletType: keyof PaymentDetails, value: number) => {
    let newDetails = { ...paymentDetails };

    if (walletType === "card") {
      const remainingPercentage = 100 - value;

      // Allocate remaining percentage to the wallets proportionally
      newDetails = {
        ...newDetails,
        card: {
          ...newDetails.card,
          percentage: value,
          amount: ((totalAmount * value) / 100).toFixed(2),
        },
        restrictedWallet: {
          ...newDetails.restrictedWallet,
          percentage: remainingPercentage,
          amount: ((totalAmount * remainingPercentage) / 100).toFixed(2),
        },
        unrestrictedWallet: {
          ...newDetails.unrestrictedWallet,
          percentage: 0,
          amount: "0",
        },
      };
    } else {
      const remainingPercentage = 100 - value;

      // Adjust the other wallet and card percentages accordingly
      newDetails = {
        ...newDetails,
        [walletType]: {
          ...newDetails[walletType],
          percentage: value,
          amount: ((totalAmount * value) / 100).toFixed(2),
        },
        [walletType === "restrictedWallet" ? "unrestrictedWallet" : "restrictedWallet"]: {
          ...newDetails[
            walletType === "restrictedWallet" ? "unrestrictedWallet" : "restrictedWallet"
          ],
          percentage: 0,
          amount: "0",
        },
        card: {
          ...newDetails.card,
          percentage: remainingPercentage,
          amount: ((totalAmount * remainingPercentage) / 100).toFixed(2),
        },
      };
    }

    setPaymentDetails(newDetails);
  };

    // Fetch wallet data using useQuery
    const { data } = useQuery({
      queryKey: ["restricted-wallet"],
      queryFn: () => getRestrictedWallet(WalletType.CASH_WALLET),
    });
  
    const walletData = data?.data;



    const handlePayment = async () => {
      try {
        setLoading(true); // Set loading to true when the process starts
    
        if (!orderId) {
          toast.error("Invalid order ID. Please refresh and try again.");
          return;
        }
    
        const restrictedAmount = parseFloat(paymentDetails.restrictedWallet.amount);
        const unrestrictedAmount = parseFloat(paymentDetails.unrestrictedWallet.amount);
    
        const paymentType =
          restrictedAmount > unrestrictedAmount ? "restricted" : "unrestricted";
    
        const balanceType =
          paymentType === "restricted"
            ? "restrictedMonetizedCashBenefitBalance"
            : "unrestrictedMonetizedCashBenefitBalance";
    
        const paymentMethod = "Combination";
    
        const walletAmount =
          paymentType === "restricted" ? restrictedAmount : unrestrictedAmount;
    
        await makePayment(orderIds, paymentMethod, walletAmount, balanceType);
    
        toast.success("Payment processed successfully!");
        router.navigate("/dashboard")
      } catch (error) {
        const typedError = error as { response?: { data?: { message?: string } } };
    
        const errorMessage =
          typedError.response?.data?.message || "An unexpected error occurred.";
        toast.error(`Payment failed: ${errorMessage}`);
      } finally {
        setLoading(false); // Reset loading state in any case
      }
    };
    
    
  return (
    <div className="">
      <div className="bg-white rounded-lg w-[600px] max-w-full flex flex-col">
        <div className="overflow-y-auto flex-1 space-y-2">
          <p className="text-sm text-gray-600">
            Adjust the sliders to allocate funds between your card, restricted wallet, and unrestricted wallet.
          </p>

          {/* Card Section */}
          <div className="p-4 space-y-2">
            <div className="items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                <img
                  src={card}
                  alt="Card"
                  className="text-white flex items-center justify-center  size-10"
                />
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 mt-2"
                  value={paymentDetails.card.amount}
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={paymentDetails.card.percentage}
                onChange={(e) => handleSliderChange("card", Number(e.target.value))}
                className="w-full"
              />
              <span className="ml-2 text-sm">{paymentDetails.card.percentage}%</span>
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
      
         <div className="bg-[#F3F8FC]">
          {/* Restricted Wallet Section */}
          <div className="p-4 space-y-2">
            <div className="items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                <img
                  src={wallet}
                  alt="Wallet"
                  className="text-white flex items-center justify-center  size-10"
                />
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 mt-2 bg-white"
                  value={paymentDetails.restrictedWallet.amount}
                
                />
              </div>
              <p className="text-xs text-start mt-3 text-[#333333]">
                Restricted Wallet Balance: £{walletData?.restrictedMonetizedCashBenefitBalance}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={paymentDetails.restrictedWallet.percentage}
                onChange={(e) =>
                  handleSliderChange("restrictedWallet", Number(e.target.value))
                }
                className="w-full"
              />
              <span className="ml-2 text-sm">{paymentDetails.restrictedWallet.percentage}%</span>
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

          {/* Unrestricted Wallet Section */}
          <div className="p-4 space-y-2">
            <div className="items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                <img
                  src={wallet}
                  alt="Wallet"
                  className="text-white flex items-center justify-center size-10"
                />
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 mt-2 bg-white"
                  value={paymentDetails.unrestrictedWallet.amount}
                  disabled
                />
              </div>
              <p className="text-xs text-start mt-3 text-[#333333]">
                Unrestricted Wallet Balance: £ {walletData?.unrestrictedMonetizedCashBenefitBalance}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={paymentDetails.unrestrictedWallet.percentage}
                onChange={(e) =>
                  handleSliderChange("unrestrictedWallet", Number(e.target.value))
                }
                className="w-full"
              />
              <span className="ml-2 text-sm">{paymentDetails.unrestrictedWallet.percentage}%</span>
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
        </div>

        </div>

        <div className="bg-white p-6">

          <button
            className={`w-full py-3 rounded-full font-medium ${
              loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "blue-gradient text-white hover:bg-blue-600"
            }`}
            onClick={handlePayment}
            disabled={loading} // Disable button when loading
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
        </div>
      </div>
    </div>
  );
};

export default ComboPaymentModal;
