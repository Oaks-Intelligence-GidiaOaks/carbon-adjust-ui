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
import { WalletType } from "@/interfaces/transaction.interface";
import { getRestrictedWallet } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { CashWalletCardSkeleton } from "./RestrictedWalletCard";
import useMutations from "@/hooks/useMutations";
import toast from "react-hot-toast";
import { copyClipboardText } from "@/lib/utils";
import { MdContentCopy } from "react-icons/md";

interface PointWalletCardProps {
  name: string; // Name of the user
  walletAddress: string; // Wallet ID of the user
  currentBalance?: number; // Current coin balance
  balance: number; // All-time coin earnings
  onRedeem: () => void; // Callback function for redeem button
}

export const PointWalletCard: React.FC<PointWalletCardProps> = ({
  balance,
  name,
  walletAddress,
  onRedeem,
}) => {
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsTextCopied(true);
    copyClipboardText(walletAddress);
    setTimeout(() => {
      setIsTextCopied(false);
    }, 3000);
  };

  return (
    <div className="w-full drop-shadow-md md:w-[400px] shrink-0 rounded-[19.2px] shadow-lg bg-gradient-to-b from-[#1381E7] to-blue-600 text-white font-inter flex flex-col ">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xs font-poppins font-light">Coin Wallet</h2>
            <p className="text-base font-[400]">{name}</p>
          </div>
          <div className="text-right">
            <div className="flex-center gap-3">
              <p className="text-xs font-light capitalize">Wallet ID</p>

              {isTextCopied ? (
                <span className="text-blue-200 text-xs"> copied</span>
              ) : (
                <MdContentCopy
                  className="cursor-pointer text-xs"
                  onClick={handleCopy}
                />
              )}
            </div>
            <p className="text-xs uppercase font-[400] max-w-32 truncate">
              {walletAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-b from-[#2E599A] to-[#0B8DFF] rounded-b-[19.2px] p-4 px-6 flex justify-between items-center mt-auto">
        <div>
          <p className="text-2xl font-[500]">
            {balance.toString().toLocaleString()}
          </p>
          <h2 className="text-xs font-light font-poppins">
            All-time coin earnings
          </h2>
        </div>

        <button
          onClick={onRedeem}
          className="hover:bg-white hover:text-blue-600 font-light px-4 py-2 border-2 hover:border-0 text-xxs rounded-xl text-gray-100 transition font-poppins"
        >
          Redeem coins
        </button>
      </div>
    </div>
  );
};

const PointWallet = () => {
  const [activeModal, setActiveModal] = useState<PointWalletDialog | null>(
    null
  );
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["get-wallet-info"],
    queryFn: () => getRestrictedWallet(WalletType.COIN_WALLET),
  });

  const { TransferPointToCash } = useMutations();

  const walletInfo = data?.data;

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText("DannyWalters8012345k");
    setIsTextCopied(true);

    setTimeout(() => {
      setIsTextCopied(false);
    }, 4000);
  };

  // @ts-ignore
  const handleConfirm = (amount: number) => {
    TransferPointToCash.mutate(amount, {
      onSuccess: (_: any) => {
        setActiveModal(PointWalletDialog.SUCCESS);
      },
      onError: (ex: any) => {
        toast.error(ex.response.data.message || `error occurred...`);
      },
    });
  };

  const handleResend = () => {
    alert("otp resent to numeber");
  };

  const getActiveModal: IComponentMap = {
    [PointWalletDialog.TRANSFER]: (
      <TransferToCashWalletModal
        maxCoins={walletInfo?.balance || 0}
        cashEquivalent={500}
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirm}
        isPending={TransferPointToCash.isPending}
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
        maxCoins={walletInfo?.balance || 0}
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

  if (isLoading || isRefetching) {
    return (
      <div className="flex gap-3 md:gap-5 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[82vw] lg:max-w-[88vw] xl:max-w-[88vw]">
        {Array.from({ length: 2 }, (_, i) => (
          <CashWalletCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-x-3 gap-y-6 md:gap-x-5 flex-wrap md:flex-nowrap xl:w-[70vw]">
      <PointWalletCard {...walletInfo} onRedeem={() => {}} />

      <div className="flex gap-x-3 md:gap-x-5">
        <RedeemActionsCard setActiveModal={setActiveModal} />

        <ReferralInfoCard
          referralCode="DannyWalters8012345k"
          onCopy={handleCopyReferralCode}
          showCopied={isTextCopied}
        />
      </div>

      {activeModal && getActiveModal[activeModal]}
    </div>
  );
};

export default PointWallet;
