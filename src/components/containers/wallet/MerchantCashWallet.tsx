import BankCardDetails from "@/components/dialogs/BankCardDetailsModal";
import PayoutBankDetailsModal from "@/components/dialogs/PayoutBankDetailsModal";
import WithdrawalMethodModal from "@/components/dialogs/WithdrawalMethodModal";
import WithdrawalSuccessModal from "@/components/dialogs/WithdrawalSuccessModal";
import MerchantWalletCard from "@/components/ui/MarchantWalletCard";
import { CashWalletCardSkeleton } from "@/components/ui/RestrictedWalletCard";
import { WalletType } from "@/interfaces/transaction.interface";
import { WithdrawalWalletDialog } from "@/interfaces/wallet.interface";
import { getRestrictedWallet } from "@/services/homeOwner";
import { IComponentMap } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MerchantCashWallet = () => {
  const [activeModal, setActiveModal] = useState<WithdrawalWalletDialog | null>(
    null
  );

  const [selectedMethod, setSelectedMethod] = useState<"bank" | "card" | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["restricted-wallet", WalletType.CASH_WALLET],
    queryFn: () => getRestrictedWallet(WalletType.CASH_WALLET),
  });

  let walletData = data?.data;

  const handleWithdraw = () => {
    setActiveModal(WithdrawalWalletDialog.WITHDRAWAL_METHOD);
  };

  const handleConfirm = (method: string) => {
    if (method === "bank") {
      setActiveModal(WithdrawalWalletDialog.BANK_PAYOUT);
    } else {
      setActiveModal(WithdrawalWalletDialog.CARD_PAYOUT);
    }
  };

  const getActiveModal: IComponentMap = {
    [WithdrawalWalletDialog.WITHDRAWAL_METHOD]: (
      <WithdrawalMethodModal
        selectedMethod={selectedMethod}
        onClose={() => setActiveModal(null)}
        selectMethod={setSelectedMethod}
        onConfirm={handleConfirm}
      />
    ),
    [WithdrawalWalletDialog.BANK_PAYOUT]: (
      <PayoutBankDetailsModal
        verify={() => setActiveModal(WithdrawalWalletDialog.SUCCESS)}
        goBack={() => setActiveModal(WithdrawalWalletDialog.WITHDRAWAL_METHOD)}
      />
    ),
    [WithdrawalWalletDialog.CARD_PAYOUT]: (
      <BankCardDetails
        verify={() => setActiveModal(WithdrawalWalletDialog.SUCCESS)}
        goBack={() => setActiveModal(WithdrawalWalletDialog.WITHDRAWAL_METHOD)}
      />
    ),
    [WithdrawalWalletDialog.SUCCESS]: (
      <WithdrawalSuccessModal onClose={() => setActiveModal(null)} />
    ),
  };

  if (isLoading || !walletData) {
    return (
      <div className="flex gap-3">
        {Array.from({ length: 2 }, (_, i) => (
          <CashWalletCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[60vw] lg:max-w-[70vw] xl:max-w-[75vw]">
      <MerchantWalletCard
        type="total"
        name={walletData?.name || ""}
        walletType="Cash Wallet"
        totalEarnings={walletData?.balance || "0"}
        onWithdraw={handleWithdraw}
        walletAddress={walletData?.walletAddress || ""}
      />

      <MerchantWalletCard
        type="split"
        name={walletData?.name || "0"}
        rmcb={walletData?.restrictedMonetizedCashBenefitBalance || "0"}
        umcb={walletData?.unrestrictedMonetizedCashBenefitBalance || "0"}
        walletType="Cash Wallet"
        totalEarnings="£0"
        onWithdraw={handleWithdraw}
        walletAddress={walletData?.walletAddress || ""}
      />

      {activeModal && getActiveModal[activeModal]}
    </div>
  );
};

export default MerchantCashWallet;
