import { WalletBg } from "@/assets/images";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

interface MerchantWalletCardProps {
  name: string; // Name of the wallet owner
  walletType: string; // Wallet type
  type: "total" | "split";
  totalEarnings: string; // Total earnings
  onWithdraw: () => void; // Callback for withdraw button
  rmcb?: number;
  umcb?: number;
  walletAddress: string;
}

const MerchantWalletCard: React.FC<MerchantWalletCardProps> = ({
  name,
  walletType,
  totalEarnings,
  rmcb,
  umcb,
  walletAddress,
  type = "total",
  onWithdraw,
}) => {
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsTextCopied(true);
    navigator.clipboard.writeText(walletAddress);

    setTimeout(() => {
      setIsTextCopied(false);
    }, 3000);
  };

  return (
    <div
      className={`w-[330px] md:w-[412px] shrink-0 rounded-[20px] ${
        type === "total" ? "bg-[#2C5C9F]" : "bg-[#232E3C]"
      }  px-8 py-8 text-white font-poppins relative overflow-hidden text-xs`}
    >
      <WalletBg className="absolute  w-full rounded-[20px] h-full -right-10 top-0 z-[5]" />

      <div className="z-[50] relative flex flex-col justify-between h-full">
        {/* Wallet Details */}
        <div className="flex justify-between">
          <div className="mb-5">
            <p className="text-xs font-light capitalize">{name}</p>
            <p className="text-sm font-[500]">{walletType}</p>
          </div>

          <div className="mb-5">
            <div className="flex-center gap-3">
              <p className="text-xs font-light capitalize">Wallet ID</p>

              {isTextCopied ? (
                <span className="text-blue-200"> copied</span>
              ) : (
                <MdContentCopy
                  className="cursor-pointer"
                  onClick={handleCopy}
                />
              )}
            </div>
            <p className="text-sm font-[500] max-w-24  md:max-w-36 truncate">
              {walletAddress}
            </p>
          </div>
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

              <p className="text-base">£{umcb?.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <p className="">Money from RMCB</p>

              <p className="text-base">£{rmcb?.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantWalletCard;
