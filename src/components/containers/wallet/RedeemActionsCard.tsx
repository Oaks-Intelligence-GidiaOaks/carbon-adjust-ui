import { GrantPkgIcon } from "@/assets/icons";
import { PointWalletDialog } from "@/interfaces/wallet.interface";
import React, { Dispatch, SetStateAction } from "react";

interface RedeemActionsCardProps {
  setActiveModal: Dispatch<SetStateAction<PointWalletDialog | null>>;
}

const RedeemActionsCard: React.FC<RedeemActionsCardProps> = ({
  setActiveModal,
}) => {
  return (
    <div className="flex flex-col items-center p-3 md:p-6 flex-[0.4] md:flex-initial md:w-[200px] md:shrink-0 bg-gray-100 rounded-lg shadow-lg">
      {/* Icon */}
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <GrantPkgIcon />
      </div>

      {/* Buttons */}
      <button
        onClick={() => setActiveModal(PointWalletDialog.P2P)}
        className="mb-4 px-3  md:px-6 py-2 border border-[#0E89F7] text-[#0E89F7] rounded-[16px] text-xxs md:text-xs hover:bg-blue-50 transition "
      >
        <span className="whitespace-nowrap truncate">Transfer to friend</span>
      </button>

      <button
        onClick={() => setActiveModal(PointWalletDialog.TRANSFER)}
        className="px-4 whitespace-nowrap md:px-6 py-2 bg-gradient-to-r from-[#2E599A] to-[#0B8DFF] text-white text-[9px] md:text-xs rounded-[16px] hover:from-blue-600 hover:to-blue-700 transition"
      >
        Redeem as Cash
      </button>
    </div>
  );
};

export default RedeemActionsCard;
