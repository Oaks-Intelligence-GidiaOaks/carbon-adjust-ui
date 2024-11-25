import { WalletBg } from "@/assets/images";
import React from "react";

interface MerchantWalletCardProps {
  name: string; // Name of the wallet owner
  walletType: string; // Wallet type
  type: "total" | "split";
  totalEarnings: string; // Total earnings
  onWithdraw: () => void; // Callback for withdraw button
}

const MerchantWalletCard: React.FC<MerchantWalletCardProps> = ({
  name,
  walletType,
  totalEarnings,
  type = "total",
  onWithdraw,
}) => {
  return (
    <div
      className={`w-[300px] md:w-[412px] shrink-0 rounded-[20px] ${
        type === "total" ? "bg-[#2C5C9F]" : "bg-[#232E3C]"
      }  px-8 py-8 text-white font-poppins relative overflow-hidden text-xs`}
    >
      <WalletBg className="absolute  w-full rounded-[20px] h-full -right-10 top-0 z-[5]" />

      <div className="z-[50] relative flex flex-col justify-between h-full">
        {/* Wallet Details */}
        <div className="mb-5">
          <p className="text-xs font-light capitalize">{name}</p>
          <p className="text-sm font-[500]">{walletType}</p>
        </div>

        {/* Total Earnings */}
        <div className="mb-5">
          <p className="text-sm font-light">
            {type === "total" ? "Total Earnings" : "Money from Card"}
          </p>
          <p className="text-2xl font-[500]">{totalEarnings}</p>
        </div>

        {/* Withdraw Button */}
        {type === "total" && (
          <button
            onClick={onWithdraw}
            className="px-6 py-2 w-fit font-normal hover:text-[#2C5C9F] hover:bg-white rounded-full shadow border hover:border-none cursor-pointer transition"
          >
            Withdraw
          </button>
        )}

        {type === "split" && (
          <div className="flex-center justify-between mt-5">
            <div className="space-y-2">
              <p className="">Money from UMCB</p>

              <p className="text-base">£296,789.00</p>
            </div>

            <div className="space-y-2">
              <p className="">Money from RMCB</p>

              <p className="text-base">£236,000.00</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantWalletCard;
