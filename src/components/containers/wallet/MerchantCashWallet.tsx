import BankCardDetails from "@/components/dialogs/BankCardDetailsModal";
import PayoutBankDetailsModal from "@/components/dialogs/PayoutBankDetailsModal";
import WithdrawalMethodModal from "@/components/dialogs/WithdrawalMethodModal";
import WithdrawalSuccessModal from "@/components/dialogs/WithdrawalSuccessModal";
import MerchantWalletCard from "@/components/ui/MarchantWalletCard";
import { WithdrawalWalletDialog } from "@/interfaces/wallet.interface";
import { IComponentMap } from "@/types/general";
import { useState } from "react";

const MerchantCashWallet = () => {
  const [activeModal, setActiveModal] = useState<WithdrawalWalletDialog | null>(
    WithdrawalWalletDialog.SUCCESS
  );

  const handleWithdraw = () => {
    console.log("Withdraw button clicked");
  };

  const handleConfirm = (method: string) => {
    setActiveModal(null);
  };

  const getActiveModal: IComponentMap = {
    [WithdrawalWalletDialog.WITHDRAWAL_METHOD]: (
      <WithdrawalMethodModal
        onClose={() => setActiveModal(null)}
        onConfirm={handleConfirm}
      />
    ),
    [WithdrawalWalletDialog.BANK_PAYOUT]: <PayoutBankDetailsModal />,
    [WithdrawalWalletDialog.CARD_PAYOUT]: <BankCardDetails />,
    [WithdrawalWalletDialog.SUCCESS]: (
      <WithdrawalSuccessModal onClose={() => setActiveModal(null)} />
    ),
  };

  return (
    <div className="flex gap-6">
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
