import { Successful } from "@/assets/images";
import ConfirmPointTransactionModal from "@/components/dialogs/ConfirmPointTransactionModal";
import TransferCashP2PModal from "@/components/dialogs/TransferCashP2PModal";
import TransferSuccessModal from "@/components/dialogs/TransferPointSuccessModal";
import {
  CashWalletCard,
  CashWalletCardSkeleton,
} from "@/components/ui/RestrictedWalletCard";
import useMutations from "@/hooks/useMutations";
import { WalletType } from "@/interfaces/transaction.interface";
import { CashWalletDialog } from "@/interfaces/wallet.interface";
import { validateTransferCashInputs } from "@/lib/utils";
import { getRestrictedWallet } from "@/services/homeOwner";
import { IComponentMap } from "@/types/general";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const CashWallet = () => {
  const queryClient = useQueryClient();
  const [activeModal, setActiveModal] = useState<CashWalletDialog | null>(null);

  const { SendRcmbOTP, VerifyRcmbOtp } = useMutations();

  const { data, isLoading } = useQuery({
    queryKey: ["get-wallet-info", WalletType.CASH_WALLET],
    queryFn: () => getRestrictedWallet(WalletType.CASH_WALLET),
    refetchInterval: 300000,
  });

  let walletData = data?.data;

  const handleConfirm = (amount: number, walletAddress: string) => {
    const errors = validateTransferCashInputs({
      walletAddress,
      amount,
    });

    if (errors) {
      return toast.error(errors[0]);
    }

    SendRcmbOTP.mutate(
      { amount, receiverWalletAddress: walletAddress },
      {
        onSuccess: () => {
          setActiveModal(CashWalletDialog.CONFIRM_TRANSACTION);
        },
        onError: (ex: any) => {
          toast.error(
            ex.response.data.message || "error processing request..."
          );
        },
      }
    );
  };

  const handleVerifyOtp = (otp: string) => {
    if (!otp.length) {
      return toast.error("Please enter a value for otp");
    }

    VerifyRcmbOtp.mutate(otp, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-wallet-info", WalletType.CASH_WALLET],
        });
        setActiveModal(CashWalletDialog.SUCCESS);
      },
      onError: (ex: any) => {
        toast.error(
          ex.response.data.message || "Error occurred. Please try again"
        );
      },
    });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getActiveModal: IComponentMap = {
    [CashWalletDialog.TRANSFER]: (
      <TransferCashP2PModal
        onConfirm={handleConfirm}
        maxCash={walletData?.restrictedMonetizedCashBenefitBalance}
        onClose={closeModal}
        isPending={SendRcmbOTP.isPending}
      />
    ),
    [CashWalletDialog.CONFIRM_TRANSACTION]: (
      <ConfirmPointTransactionModal
        onResend={() => {}}
        onConfirm={handleVerifyOtp}
        email=""
        onClose={closeModal}
        isPending={VerifyRcmbOtp.isPending}
      />
    ),
    [CashWalletDialog.SUCCESS]: (
      <TransferSuccessModal
        Icon={Successful}
        message="You have successfully transferred your cash. You can find the remaining balance on your Cash wallet."
        onClose={closeModal}
        onViewWallet={() => {}}
      />
    ),
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 md:gap-5 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[82vw] lg:max-w-[88vw] xl:max-w-[88vw]">
        {Array.from({ length: 2 }, (_, i) => (
          <CashWalletCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 md:gap-5 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[82vw] lg:max-w-[88vw] xl:max-w-[88vw]">
      <CashWalletCard
        key={1}
        type="total"
        name={walletData?.name || ""}
        walletId={walletData?.walletAddress || ""}
        totalCWB={walletData?.balance || "0"}
        grantCredit={walletData?.grantUsed || "0"}
      />

      <CashWalletCard
        key={2}
        type="rcwb"
        onTransfer={() => setActiveModal(CashWalletDialog.TRANSFER)}
        name={walletData?.name || ""}
        walletId={walletData?.walletAddress || ""}
        rcwb={walletData?.restrictedMonetizedCashBenefitBalance || "0"}
        ucwb={walletData?.unrestrictedMonetizedCashBenefitBalance || "0"}
      />

      {activeModal && getActiveModal[activeModal]}
    </div>
  );
};

export default CashWallet;
