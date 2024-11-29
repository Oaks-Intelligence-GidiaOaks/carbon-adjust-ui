import React, { useState } from "react";
import Modal from "./Modal";
import { MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getCoinSettings } from "@/services/adminService";
import { Oval } from "react-loader-spinner";

interface TransferPointsP2PModalProps {
  maxCoins: number; // The maximum number of convertible coins
  cashEquivalent: number; // The cash equivalent for the maximum coins
  onClose: () => void; // Callback to close the modal
  onConfirm: (amount: number, walletAddress: string) => void; // Callback for confirming the transfer
  isPending: boolean;
}

const TransferPointsP2PModal: React.FC<TransferPointsP2PModalProps> = ({
  maxCoins,
  onClose,
  onConfirm,
  isPending,
}) => {
  const [details, setDetails] = useState({
    amount: 0,
    walletAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const { data } = useQuery({
    queryKey: ["coin-settings"],
    queryFn: getCoinSettings,
  });

  let conversionRate = data?.data?.coinConversionRate;

  const cashValue = conversionRate ? details.amount * conversionRate : 0;

  return (
    <Modal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[414px] p-6 shadow-lg animate-bounceIn mx-4">
          <div className="w-fit ml-auto">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center mx-auto">
              Gift Coins to Friends (P2P)
            </h2>
          </div>

          {/* Wallet ID Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coin wallet ID
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3 py-2">
              <input
                type="text"
                className="flex-1 text-sm bg-transparent focus:outline-none"
                placeholder="Wallet ID"
                name="walletAddress"
                value={details.walletAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3 py-2">
              <input
                type="number"
                className="flex-1 text-sm bg-transparent focus:outline-none"
                placeholder="Enter coin amount"
                min={0}
                max={maxCoins}
                value={details.amount}
                name="amount"
                onChange={handleChange}
              />
              <span className="text-gray-500 font-medium">
                ≈ £{cashValue.toFixed(2)}
              </span>
            </div>

            <div className="flex-center justify-between">
              <p className="mt-2 text-xs text-gray-500">
                Convertible coins: {maxCoins}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Cash Equivalent: {maxCoins * conversionRate}
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-6">
            <input
              type="range"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none focus:outline-none"
              min={0}
              max={maxCoins}
              name="amount"
              value={details.amount}
              onChange={handleChange}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Min</span>
              <span>10%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>Max</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Adjust slider to set percentage of coins you wish to transfer to
              your cash wallet balance.
            </p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => onConfirm(details.amount, details.walletAddress)}
            className={`w-full py-3 text-white rounded-[24px] font-[500] grid place-items-center ${
              details.amount < 1 || isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2E599A] to-[#0B8DFF]"
            }`}
            disabled={details.amount <= 0 || isPending}
          >
            {isPending ? (
              <Oval
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Confirm Transfer</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferPointsP2PModal;