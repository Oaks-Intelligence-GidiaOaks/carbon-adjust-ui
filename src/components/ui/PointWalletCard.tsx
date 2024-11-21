import dataWallet from "@/dummy/walletData.json";
import RedeemActionsCard from "../containers/wallet/RedeemActionsCard";
import ReferralInfoCard from "../containers/wallet/ReferralInfoCard";
import TransferToCashWalletModal from "../dialogs/TransferToCashWalletModal";
import { useState } from "react";
import { IComponentMap } from "@/types/general";
import TransferSuccessModal from "../dialogs/TransferPointSuccessModal";
import TransferPointsP2PModal from "../dialogs/TransferPointsP2PModal";
import ConfirmPointTransactionModal from "../dialogs/ConfirmPointTransactionModal";
import { PointWalletDialog } from "@/interfaces/wallet.interface";
import { Successful } from "@/assets/images";
import { TickCircle } from "@/assets/icons";

interface PointWalletCardProps {
  userName: string; // Name of the user
  walletId: string; // Wallet ID of the user
  currentBalance: number; // Current coin balance
  redeemableCoins: number; // Redeemable coins
  allTimeEarnings: number; // All-time coin earnings
  onRedeem: () => void; // Callback function for redeem button
}
export const PointWalletCard: React.FC<PointWalletCardProps> = ({
  userName,
  walletId,
  currentBalance,
  redeemableCoins,
  allTimeEarnings,
  onRedeem,
}) => {
  return (
    <div className="w-full drop-shadow-md max-w-[400px] rounded-[19.2px] shadow-lg bg-gradient-to-b from-[#1381E7] to-blue-600 text-white ">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xs tracking-tight">Coin Wallet</h2>
            <p className="text-base font-[400]">{userName}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xs tracking-tight">Wallet ID</h2>
            <p className="text-base font-[400]">{walletId}</p>
          </div>
        </div>

        <div className="flex-center justify-between mb-4">
          <div>
            <h2 className="text-xs tracking-tight">Current Coin Balance</h2>
            <p className="text-xl font-[500]]">
              {currentBalance.toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-xs tracking-tight">Redeemable Coins</h2>
            <p className="text-xl font-[500]]">
              {redeemableCoins.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-b from-[#2E599A] to-[#0B8DFF] rounded-b-[19.2px] p-4 px-6 flex justify-between items-center ">
        <div>
          <p className="text-2xl font-[500]">
            {allTimeEarnings.toLocaleString()}
          </p>
          <h2 className="text-xs">All-time coin earnings</h2>
        </div>

        <button
          onClick={onRedeem}
          className="hover:bg-white hover:text-blue-600 font-[400] tracking-tight px-4 py-2 border hover:border-0 text-xs rounded-lg text-gray-100 transition"
        >
          Redeem coins
        </button>
      </div>
    </div>
  );
};

const PointWallet = () => {
  const [activeModal, setActiveModal] = useState<PointWalletDialog | null>(
    PointWalletDialog.TRANSFER
  );

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText("DannyWalters8012345k");
    alert("Referral code copied to clipboard!");
  };

  // @ts-ignore
  const handleConfirm = (amount: number) => {
    setActiveModal(PointWalletDialog.SUCCESS);
  };

  const handleResend = () => {
    alert("otp resent to numeber");
  };

  const getActiveModal: IComponentMap = {
    [PointWalletDialog.TRANSFER]: (
      <TransferToCashWalletModal
        maxCoins={1000}
        cashEquivalent={500}
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirm}
      />
    ),
    [PointWalletDialog.SUCCESS]: (
      <TransferSuccessModal
        Icon={Successful}
        message="You have successfully converted and transferred your earned coins to cash. You can find the balance on your Cash wallet."
        onClose={() => setActiveModal(null)}
        onViewWallet={() => {}}
      />
    ),
    [PointWalletDialog.P2P]: (
      <TransferPointsP2PModal
        maxCoins={1000}
        cashEquivalent={500}
        onClose={() => setActiveModal(null)}
        onConfirm={() => setActiveModal(PointWalletDialog.CONFIRM_TRANSACTION)}
      />
    ),

    [PointWalletDialog.CONFIRM_TRANSACTION]: (
      <ConfirmPointTransactionModal
        email="************sie@gmail.com"
        onClose={() => setActiveModal(null)}
        onConfirm={() => setActiveModal(PointWalletDialog.P2P_SUCCESS)}
        onResend={handleResend}
      />
    ),
    [PointWalletDialog.P2P_SUCCESS]: (
      <TransferSuccessModal
        Icon={TickCircle}
        message="You have successfully transferred your earned coins via P2P to @Michelangelo. They can find the transferred coins in their Restricted Cash Wallet balance."
        onClose={() => setActiveModal(null)}
        onViewWallet={() => {}}
      />
    ),
  };

  return (
    <div className="flex-center gap-8">
      <PointWalletCard {...dataWallet} onRedeem={() => {}} />

      <RedeemActionsCard setActiveModal={setActiveModal} />

      <ReferralInfoCard
        referralCode="DannyWalters8012345k"
        onCopy={handleCopyReferralCode}
      />

      {activeModal && getActiveModal[activeModal]}
    </div>
  );
};

export default PointWallet;
