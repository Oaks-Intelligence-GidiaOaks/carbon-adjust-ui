import { CashWalletCard } from "@/components/ui/RestrictedWalletCard";

const CashWallet = () => {
  return (
    <div className="flex gap-3 md:gap-5 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[90vw] md:max-w-[82vw] lg:max-w-[88vw] xl:max-w-[88vw]">
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
