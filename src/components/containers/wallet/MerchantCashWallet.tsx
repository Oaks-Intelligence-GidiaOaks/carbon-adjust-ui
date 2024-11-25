import BankCardDetails from "@/components/dialogs/BankCardDetailsModal";
import PayoutBankDetailsModal from "@/components/dialogs/PayoutBankDetailsModal";
import WithdrawalMethodModal from "@/components/dialogs/WithdrawalMethodModal";
import WithdrawalSuccessModal from "@/components/dialogs/WithdrawalSuccessModal";
import MerchantWalletCard from "@/components/ui/MarchantWalletCard";
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

  // @ts-ignore
  const getWalletData = useQuery({
    queryKey: ["restricted-wallet"],
    queryFn: () => getRestrictedWallet(WalletType.CASH_WALLET),
  });

  const handleWithdraw = () => {
    setActiveModal(WithdrawalWalletDialog.WITHDRAWAL_METHOD);
  };

  // @ts-ignore
  const handleConfirm = (method: string) => {
    if (selectedMethod === "bank") {
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

  return (
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[60vw] lg:max-w-[70vw] xl:max-w-[75vw]">
      <MerchantWalletCard
        type="total"
        name="Danny Walters"
        walletType="Carbon Credit Wallet"
        totalEarnings="£532,789.00"
        onWithdraw={handleWithdraw}
      />

      <MerchantWalletCard
        type="split"
        name="Danny Walters"
        walletType="Carbon Credit Wallet"
        totalEarnings="£532,789.00"
        onWithdraw={handleWithdraw}
      />

      {activeModal && getActiveModal[activeModal]}
    </div>
  );
};

export default MerchantCashWallet;
