import { CashWalletCard } from "@/components/ui/RestrictedWalletCard";

const CashWallet = () => {
  return (
    <div className="flex gap-5">
      <CashWalletCard
        key={1}
        type="total"
        name="Danny Walters"
        walletId="0001-A0M6-M010"
        totalCWB="£532,789"
        grantCredit="532,789"
      />

      <CashWalletCard
        key={2}
        type="rcwb"
        name="Danny Walters"
        walletId="0001-A0M6-M010"
        rcwb="£532,789"
        ucwb="532,789"
      />
    </div>
  );
};

export default CashWallet;
